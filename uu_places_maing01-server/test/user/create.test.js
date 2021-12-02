const { Helper, Workspace, Server } = require("../utils/places-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const UserTestHelper = require("../utils/user-test-helper");
const ValidateUser = require("../utils/validate-structures/user");

const CMD = "user/create";

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
  ValidateUser.validateObject(response, expectedOutput);
}

describe("Testing the user/create uuCmd...", () => {
  test("HDS", async () => {
    const response = await UserTestHelper.userCreate();

    ValidateHelper.validateBaseHds(response);
    expectedHds(response, DefaultDtoIn.User.Create);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const response = await UserTestHelper.userCreate(DefaultDtoIn.unsupportedKeys);
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response, DefaultDtoIn.User.Create);
  });

  test("Test 1.3.1 - invalidDtoIn", async () => {
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await Workspace.executePostCommand(CMD, {});
    } catch (e) {
      ValidateHelper.validateInvalidDtoIn(e, CMD);
    }
  });

  test("Test 2.1 - userAlreadyCreated", async () => {
    const expectedError = ErrorAssets.userAlreadyCreated(CMD);

    expect.assertions(ValidateHelper.assertionsCount.error);
    await UserTestHelper.userCreate();
    try {
      await UserTestHelper.userCreate();
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 3.1 - could not be simulated
});
