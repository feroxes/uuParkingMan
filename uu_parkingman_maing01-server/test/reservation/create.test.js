const { Helper, Workspace, Server } = require("../utils/parkingman-main-test-helper.js");
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

const CMD = "reservation/create";

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

async function prepareBasic(amount = 3) {
  const user = await UserTestHelper.userCreate();
  const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();
  return {
    userId: user.id,
    parkingPlaceId: parkingPlace.id,
    dayFrom: DateTimeHelper.now(),
    dayTo: moment().add(amount, "days").format(DateTimeHelper.getDefaultDateFormat()),
  };
}

describe("Testing the user/create uuCmd...", () => {
  test("HDS", async () => {
    const dtoIn = await prepareBasic();

    const response = await ReservationTestHelper.reservationCreate(dtoIn);

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const dtoIn = await prepareBasic();
    const response = await ReservationTestHelper.reservationCreate({ ...dtoIn, ...DefaultDtoIn.unsupportedKeys });
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

  test("Test 2.1 - userDoesNotExist", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.userId = Constants.wrongId;
    const expectedError = ErrorAssets.userDoesNotExist(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 3.1 - parkingPlaceDoesNotExist", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.parkingPlaceId = Constants.wrongId;
    const expectedError = ErrorAssets.parkingPlaceDoesNotExist(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 4.1 - dateCouldNotBeInPast (dayFrom)", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.dayFrom = Constants.dayInPast;
    const expectedError = ErrorAssets.dateCouldNotBeInPast(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 4.1 - dateCouldNotBeInPast (dayTo)", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.dayTo = Constants.dayInPast;
    const expectedError = ErrorAssets.dateCouldNotBeInPast(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 5.1 - dateToCouldNotBeLessThenDayFrom", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.dayFrom = moment().add(5, "days").format(DateTimeHelper.getDefaultDateFormat());
    const expectedError = ErrorAssets.dateToCouldNotBeLessThenDayFrom(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 6.1 - reservationLimitExceeded", async () => {
    const dtoIn = await prepareBasic(7);
    const expectedError = ErrorAssets.reservationLimitExceeded(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 7.1 - parkingPlaceAlreadyReserved", async () => {
    const dtoIn = await prepareBasic();
    await ReservationTestHelper.reservationCreate(dtoIn);
    const expectedError = ErrorAssets.parkingPlaceAlreadyReserved(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationCreate(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 8.1 - could not be simulated
});
