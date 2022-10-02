const { Helper, Workspace, Server } = require("../utils/places-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const moment = require("moment");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const ReservationTestHelper = require("../utils/reservation-test-helper");
const UserTestHelper = require("../utils/user-test-helper");
const ParkingPlaceHelper = require("../utils/parking-place-test-helper");
const ValidateReservation = require("../utils/validate-structures/reservation");
const DateTimeHelper = require("../../app/abl/helpers/day-time-helper.js");
const Constants = require("../constants.js");
const { TestHelper } = require("uu_appg01_server-test");

const CMD = "reservation/update";

beforeAll(async () => {
  await Server.start();
  await Workspace.setup();
});

beforeEach(async () => {
  await Workspace.dropDatabase();
  await Helper.initUuSubApp();
  await Workspace.login("Authorities");
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await Workspace.teardown();
  await Server.stop();
});

function expectedHds(response, expectedOutput = {}) {
  ValidateHelper.validateBaseObjectData(response);
  ValidateReservation.validateObject(response, expectedOutput);
}

async function prepareBasic(amount = 3, userName = null, useCreateDtoIn = {}) {
  const user = await UserTestHelper.userCreate(useCreateDtoIn);
  const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();
  const reservationCreateDtoIn = {
    userId: user.id,
    parkingPlaceId: parkingPlace.id,
    dayFrom: DateTimeHelper.now(),
    dayTo: moment().add(amount, "days").format(DateTimeHelper.getDefaultDateFormat()),
  };
  if (userName) {
    await TestHelper.login(userName);
  }
  return await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);
}

describe("Testing the reservation/update uuCmd...", () => {
  test("HDS", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };

    const response = await ReservationTestHelper.reservationUpdate(dtoIn);
    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("HDS", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const user2 = await UserTestHelper.userCreate({ uuIdentity: Constants.uuIdentity2 });
    const parkingPlace2 = await ParkingPlaceHelper.parkingPlaceCreate({ number: 9 });

    const dtoIn = {
      id: reservation.id,
      userId: user2.id,
      parkingPlaceId: parkingPlace2.id,
      dayFrom: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      dayTo: moment()
        .add(Constants.defaultDuration + 2, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const response = await ReservationTestHelper.reservationUpdate(dtoIn);

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const response = await ReservationTestHelper.reservationUpdate({ ...dtoIn, ...DefaultDtoIn.unsupportedKeys });
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response, dtoIn);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executePostCommand(CMD, {});
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  test("Test 3.1 - reservationDoesNotExist", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: Constants.wrongId,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.reservationDoesNotExist(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 4.2 - reservationBelongsToDifferentUser", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration, null, { uuIdentity: "8517-626-1" });
    const dtoIn = {
      id: reservation.id,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };

    const expectedError = ErrorAssets.reservationBelongsToDifferentUser(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn, "Users");
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 4.3 - notAllowedToChangeUser", async () => {
    const user = await UserTestHelper.userCreate({ uuIdentity: Constants.uuIdentityUser });
    const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();
    const reservationCreateDtoIn = {
      userId: user.id,
      parkingPlaceId: parkingPlace.id,
      dayFrom: DateTimeHelper.now(),
      dayTo: moment().add(Constants.defaultDuration, "days").format(DateTimeHelper.getDefaultDateFormat()),
    };
    const reservation = await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);
    const user2 = await UserTestHelper.userCreate({ uuIdentity: Constants.uuIdentity2 });

    const dtoIn = {
      id: reservation.id,
      userId: user2.id,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };

    const expectedError = ErrorAssets.notAllowedToChangeUser(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn, "Users");
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 5.1 - reservationRevisionDoesNotMatch", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev + Constants.defaultDuration,
    };

    const expectedError = ErrorAssets.reservationRevisionDoesNotMatch(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 6.1 - userDoesNotExist", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      userId: Constants.wrongId,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.userDoesNotExist(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 7.1 - parkingPlaceDoesNotExist", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      parkingPlaceId: Constants.wrongId,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.parkingPlaceDoesNotExist(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 7.2 - parkingPlaceIsBlockedForReservation", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      parkingPlaceId: reservation.parkingPlaceId,
      dayTo: moment()
        .add(Constants.defaultDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    await ParkingPlaceHelper.parkingPlaceUpdate({ id: dtoIn.parkingPlaceId, isBlocked: true });
    const expectedError = ErrorAssets.parkingPlaceIsBlockedForReservation(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 8.1 - dateCouldNotBeInPast (dayFrom)", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: Constants.dayInPast,
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.dateCouldNotBeInPast(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 8.1 - dateCouldNotBeInPast (dayTo)", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: Constants.dayInPast,
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.dateCouldNotBeInPast(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 9.1 - dateToCouldNotBeLessThenDayFrom", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayFrom: moment().add(5, "days").format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.dateToCouldNotBeLessThenDayFrom(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 10.1 - reservationLimitExceeded", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration);
    const dtoIn = {
      id: reservation.id,
      dayTo: moment().add(7, "days").format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.reservationLimitExceeded(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 11.1 - reservationClosed", async () => {
    const reservation = await prepareBasic(Constants.defaultDuration, "Users");
    const dtoIn = {
      id: reservation.id,
      dayFrom: moment().add(10, "days").format(DateTimeHelper.getDefaultDateFormat()),
      dayTo: moment().add(10, "days").format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const expectedError = ErrorAssets.reservationClosed(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn, "Users");
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 12.2 - parkingPlaceAlreadyReserved", async () => {
    const user = await UserTestHelper.userCreate();
    const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();

    const reservationCreateDtoIn = {
      userId: user.id,
      parkingPlaceId: parkingPlace.id,
      dayFrom: DateTimeHelper.now(),
      dayTo: moment().add(Constants.defaultDuration, "days").format(DateTimeHelper.getDefaultDateFormat()),
    };
    const reservation = await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);

    reservationCreateDtoIn.dayFrom = moment().add(10, "days").format(DateTimeHelper.getDefaultDateFormat());
    reservationCreateDtoIn.dayTo = moment()
      .add(10 + Constants.defaultDuration, "days")
      .format(DateTimeHelper.getDefaultDateFormat());
    const reservation2 = await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);

    const dtoIn = {
      id: reservation.id,
      dayFrom: reservation2.dayFrom,
      dayTo: reservation2.dayTo,
      revision: reservation.sys.rev,
    };

    const expectedError = ErrorAssets.parkingPlaceAlreadyReserved(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationUpdate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 10.1 - could not be simulated
});
