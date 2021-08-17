const { Helper, Workspace, Server } = require("../utils/parkingman-main-test-helper.js");
const ValidateHelper = require("../utils/validate-helper");
const DefaultDtoIn = require("../default-dto-in");
const ErrorAssets = require("../error-assets");
const UserTestHelper = require("../utils/user-test-helper");
const ValidateUser = require("../utils/validate-structures/user");

const CMD = "user/list";

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
  ValidateUser.validateListObject(response, expectedOutput);
}

describe("Testing the user/create uuCmd...", () => {
  test("HDS", async () => {
    await UserTestHelper.userCreate();
    const response = await UserTestHelper.userList();

    ValidateHelper.validateBaseHds(response);
    expectedHds(response);
  });

  test("Test 1.2.1 - unsupportedKeys", async () => {
    await UserTestHelper.userCreate();
    const response = await UserTestHelper.userList(DefaultDtoIn.unsupportedKeys);
    const expectedWarning = ErrorAssets.unsupportedKeys(CMD);

    ValidateHelper.validateUnsupportedKeysWarning(response, expectedWarning);
    expectedHds(response);
  });

  // HDS 1.3.1 - could not be simulated
});
