const { Helper, Workspace, Server } = require("../utils/parkingman-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const ParkingPlaceTestHelper = require("../utils/parking-place-test-helper");
const ValidateParkingPlace = require("../utils/validate-structures/parking-place");

const CMD = "parkingPlace/create";

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
  ValidateParkingPlace.validateObject(response, expectedOutput);
}

describe("Testing the parkingPlace/create uuCmd...", () => {
  test("HDS", async () => {
    const response = await ParkingPlaceTestHelper.parkingPlaceCreate();

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, DefaultDtoIn.ParkingPlace.Create);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const response = await ParkingPlaceTestHelper.parkingPlaceCreate(DefaultDtoIn.unsupportedKeys);
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response, DefaultDtoIn.ParkingPlace.Create);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executePostCommand(CMD, {});
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  test("Test 2.1 - parkingPlaceAlreadyCreated", async () => {
    const expectedError = ErrorAssets.parkingPlaceAlreadyCreated(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    await ParkingPlaceTestHelper.parkingPlaceCreate();
    try {
      await ParkingPlaceTestHelper.parkingPlaceCreate();
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 3.1 - could not be simulated
});
