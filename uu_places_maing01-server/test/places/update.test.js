const { Helper, Workspace, Server, PlacesTestHelper } = require("../utils/places-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const ValidatePlaces = require("../utils/validate-structures/places");

const CMD = "places/update";

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
  ValidatePlaces.validateObject(response, expectedOutput);
}

describe("Testing the places/update uuCmd...", () => {
  test("HDS", async () => {
    const response = await PlacesTestHelper.placesUpdate();

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, DefaultDtoIn.uuPlaces.Update);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const response = await PlacesTestHelper.placesUpdate(DefaultDtoIn.unsupportedKeys);
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response, DefaultDtoIn.uuPlaces.Update);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executePostCommand(CMD, {
        reservationsConfig: {
          dayOfStartReservations: 8,
          hourOfStartReservations: 33,
        },
      });
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  // HDS 3.1.A - could not be simulated
});
