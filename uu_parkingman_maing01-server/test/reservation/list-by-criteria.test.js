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

const CMD = "reservation/listByCriteria";

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
  ValidateHelper.validateBaseListResult(response, 1);
  response.itemList.forEach((res) => ValidateReservation.validateObject(res, expectedOutput));
}

async function prepareBasic(amount = 3) {
  const user = await UserTestHelper.userCreate();
  const parkingPlace = await ParkingPlaceHelper.parkingPlaceCreate();
  const dtoIn = {
    userId: user.id,
    parkingPlaceId: parkingPlace.id,
    dayFrom: DateTimeHelper.now(),
    dayTo: moment().add(amount, "days").format(DateTimeHelper.getDefaultDateFormat()),
  };
  await ReservationTestHelper.reservationCreate(dtoIn);
  return { filterMap: { ...dtoIn } };
}

describe("Testing the reservation/listByCriteria uuCmd...", () => {
  test("HDS", async () => {
    const dtoIn = await prepareBasic();
    const response = await ReservationTestHelper.reservationListByCriteria(dtoIn);

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, dtoIn);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const dtoIn = await prepareBasic();
    const response = await ReservationTestHelper.reservationListByCriteria({ ...dtoIn, ...DefaultDtoIn.unsupportedKeys });
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response, dtoIn);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.filterMap.dayTo = true;
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executeGetCommand(CMD, dtoIn);
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  test("Test 2.1 - dateToCouldNotBeLessThenDayFrom", async () => {
    const dtoIn = await prepareBasic();
    dtoIn.filterMap.dayFrom = moment().add(5, "days").format(DateTimeHelper.getDefaultDateFormat());

    const expectedError = ErrorAssets.dateToCouldNotBeLessThenDayFrom(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);

    try {
      await Workspace.executeGetCommand(CMD, dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 2.2 - dayToParameterIsRequired", async () => {
    const dtoIn = await prepareBasic();
    delete dtoIn.filterMap.dayTo;

    const expectedError = ErrorAssets.dayToParameterIsRequired(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);

    try {
      await Workspace.executeGetCommand(CMD, dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  test("Test 2.3 - dayFromParameterIsRequired", async () => {
    const dtoIn = await prepareBasic();
    delete dtoIn.filterMap.dayFrom;

    const expectedError = ErrorAssets.dayFromParameterIsRequired(CMD);
    expect.assertions(ValidateHelper.assertionsCount.error);

    try {
      await Workspace.executeGetCommand(CMD, dtoIn);
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });
});
