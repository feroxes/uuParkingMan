const { TestHelper } = require("uu_appg01_server-test");
const DefaultDtoIn = require("../default-dto-in");

const DB_LIST = {
  collections: {
    category: "category",
  },
};

const CategoryTestHelper = {
  async categoryCreate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.Category.Create, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("category/create", _dtoIn);
  },
  async categoryUpdate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.Category.Update, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("category/update", _dtoIn);
  },
  async categoryLoad(dtoIn) {
    await TestHelper.login("Authorities");
    return await TestHelper.executeGetCommand("category/get", dtoIn);
  },
  async dbUpdateKey(uuObject, code) {
    let change = { ...uuObject };
    return await TestHelper.executeDbScript(
      `db.${DB_LIST.collections.category}.updateOne( {code: "${code}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

module.exports = CategoryTestHelper;
