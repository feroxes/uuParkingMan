const { TestHelper } = require("uu_appg01_server-test");
const DefaultDtoIn = require("../default-dto-in");

const DB_LIST = {
  collections: {
    user: "user",
  },
};

const UserTestHelper = {
  async userCreate(dtoIn = {}, userName = "Authorities") {
    let _dtoIn = { ...DefaultDtoIn.User.Create, ...dtoIn };
    await TestHelper.login(userName);
    return await TestHelper.executePostCommand("user/create", _dtoIn);
  },
  async userList(dtoIn = {}) {
    let _dtoIn = { ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executeGetCommand("user/list", _dtoIn);
  },
  async userUpdate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.User.Update, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("user/update", _dtoIn);
  },
  async dbUpdateKey(uuObject, id) {
    let change = { ...uuObject };
    return await TestHelper.executeDbScript(
      `db.${DB_LIST.collections.category}.updateOne( {id: "${id}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

module.exports = UserTestHelper;
