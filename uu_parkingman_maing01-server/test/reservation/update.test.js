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
      reservationId: reservation.id,
      dayTo: moment()
        .add(Constants.defaulDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const response = await ReservationTestHelper.reservationUpdate(dtoIn);

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("HDS", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const user2 = await UserTestHelper.userCreate({ uuIdentity: "12-1350-1" });
    const parkingPlace2 = await ParkingPlaceHelper.parkingPlaceCreate({ number: 9 });

    const dtoIn = {
      reservationId: reservation.id,
      userId: user2.id,
      parkingPlaceId: parkingPlace2.id,
      dayFrom: moment()
        .add(Constants.defaulDuration + 1, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      dayTo: moment()
        .add(Constants.defaulDuration + 2, "days")
        .format(DateTimeHelper.getDefaultDateFormat()),
      revision: reservation.sys.rev,
    };
    const response = await ReservationTestHelper.reservationUpdate(dtoIn);

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      reservationId: reservation.id,
      dayTo: moment()
        .add(Constants.defaulDuration + 1, "days")
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

  test("Test 2.1 - reservationDoesNotExist", async () => {
    const reservation = await prepareBasic(Constants.defaulDuration);
    const dtoIn = {
      reservationId: Constants.wrongId,
      dayTo: moment()
        .add(Constants.defaulDuration + 1, "days")
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
});
