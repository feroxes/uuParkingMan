const { Helper, Workspace, Server } = require("../utils/parkingman-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const UserTestHelper = require("../utils/user-test-helper");
const ValidateUser = require("../utils/validate-structures/user");
const Constants = require("../constants.js");

const CMD = "user/update";

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
  ValidateHelper.validateBaseObjectData(response);
  ValidateUser.validateObject(response, DefaultDtoIn.User.Update);
}

describe("Testing the user/update uuCmd...", () => {
  test("HDS", async () => {
    const user = await UserTestHelper.userCreate();
    const response = await UserTestHelper.userUpdate({ id: user.id });
    ValidateHelper.validateBaseHds(response);
    expectedHds(response);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    const user = await UserTestHelper.userCreate();
    const response = await UserTestHelper.userUpdate({ id: user.id, ...DefaultDtoIn.unsupportedKeys });
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response);
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
    const expectedError = ErrorAssets.userDoesNotExist(CMD);
    expect.assertions(ValidateHelper.assertionsCount.invalidDtoIn);

    try {
      await UserTestHelper.userUpdate({ id: Constants.wrongId });
    } catch (e) {
      ValidateHelper.validateError(e, expectedError);
    }
  });

  // HDS 3.1 - could not be simulated
});
