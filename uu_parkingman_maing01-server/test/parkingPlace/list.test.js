const { Helper, Workspace, Server } = require("../utils/parkingman-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const ParkingPlaceTestHelper = require("../utils/parking-place-test-helper");
const ValidateParkingPlace = require("../utils/validate-structures/parking-place");

const CMD = "parkingPlace/list";

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
  ValidateParkingPlace.validateListObject(response, expectedOutput);
}

describe("Testing the parkingPlace/list uuCmd...", () => {
  test("HDS", async () => {
    await ParkingPlaceTestHelper.parkingPlaceCreate();
    const response = await ParkingPlaceTestHelper.parkingPlaceList();

    ValidateHelper.validateBaseHds(response);
    expectedHds(response);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    await ParkingPlaceTestHelper.parkingPlaceCreate();
    const response = await ParkingPlaceTestHelper.parkingPlaceList(DefaultDtoIn.unsupportedKeys);
    console.log('----->response<-----', response);
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response);
  });

  // HDS 1.3.1 - could not be simulated
});
