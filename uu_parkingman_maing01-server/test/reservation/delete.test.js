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

const CMD = "reservation/delete";

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
  const reservationCreateDtoIn = {
    userId: user.id,
    parkingPlaceId: parkingPlace.id,
    dayFrom: DateTimeHelper.now(),
    dayTo: moment().add(amount, "days").format(DateTimeHelper.getDefaultDateFormat()),
  };
  return await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);
}

describe("Testing the reservation/update uuCmd...", () => {
  test("HDS", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      id: reservation.id,
    };

    const response = await ReservationTestHelper.reservationDelete(dtoIn);
    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("HDS2", async () => {
    const user = await UserTestHelper.userCreate({ uuIdentity: Constants.uuIdentityUser });
    const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();
    const reservationCreateDtoIn = {
      userId: user.id,
      parkingPlaceId: parkingPlace.id,
      dayFrom: DateTimeHelper.now(),
      dayTo: moment().add(Constants.defaulDuration, "days").format(DateTimeHelper.getDefaultDateFormat()),
    };
    const reservation = await ReservationTestHelper.reservationCreate(reservationCreateDtoIn);
    const dtoIn = {
      id: reservation.id,
    };

    await Workspace.login("Users");
    const response = await ReservationTestHelper.reservationDelete(dtoIn);
    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      id: reservation.id,
    };
    const response = await ReservationTestHelper.reservationDelete({ ...dtoIn, ...DefaultDtoIn.unsupportedKeys });
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

  test("Test 2.1 - reservationDoesNotExist", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      id: Constants.wrongId,
    };
    const expectedError = ErrorAssets.reservationDoesNotExist(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationDelete(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 3.2 - reservationBelongsToDifferentUser", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      id: reservation.id
    };

    await Workspace.login("Users");
    const expectedError = ErrorAssets.reservationBelongsToDifferentUser(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);
    try {
      await ReservationTestHelper.reservationDelete(dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 4.1 - could not be simulated
});
