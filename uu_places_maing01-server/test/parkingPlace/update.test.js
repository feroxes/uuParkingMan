const { Helper, Workspace, Server } = require("../utils/places-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const ParkingPlaceTestHelper = require("../utils/parking-place-test-helper");
const ValidateParkingPlace = require("../utils/validate-structures/parking-place");
const Constants = require("../constants.js");

const CMD = "parkingPlace/update";

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

function expectedHds(response) {
  ValidateHelper.validateBaseHds(response);
  ValidateParkingPlace.validateObject(response, DefaultDtoIn.ParkingPlace.Update);
}

describe("Testing the parkingPlace/update uuCmd...", () => {
  test("HDS", async () => {
    const parkingPlace = await ParkingPlaceTestHelper.parkingPlaceCreate();
    const response = await ParkingPlaceTestHelper.parkingPlaceUpdate({ id: parkingPlace.id });

    ValidateHelper.validateBaseHds(response);
    expectedHds(response);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const parkingPlace = await ParkingPlaceTestHelper.parkingPlaceCreate();
    const response = await ParkingPlaceTestHelper.parkingPlaceUpdate({
      id: parkingPlace.id,
      ...DefaultDtoIn.unsupportedKeys,
    });
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executePostCommand(CMD, {});
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  test("Test 2.1 - parkingPlaceDoesNotExist", async () => {
    const expectedError = ErrorAssets.parkingPlaceDoesNotExist(CMD);
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await ParkingPlaceTestHelper.parkingPlaceUpdate({ id: Constants.wrongId });
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 3.1 - could not be simulated
});
