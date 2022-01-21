const { TestHelper } = require("uu_appg01_server-test");
const { Server } = require("./uuapp-mock-server");
const DefaultDtoIn = require("../default-dto-in");

const DB_LIST = {
  collections: {
    placesMain: "placesMain",
  },
};

const PlacesTestHelper = {
  async placesUpdate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.uuPlaces.Update, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("places/update", _dtoIn);
  },
};

const PlacesMainTestHelper = {
  async initUuSubApp(dtoIn = {}) {
    const initAppWorkspaceDtoIn = {
      ...DefaultDtoIn.uuPlaces.Init,
    };

    try {
      await TestHelper.initUuSubAppInstance(dtoIn);
      await TestHelper.createUuAppWorkspace();
      await TestHelper.initUuAppWorkspace(initAppWorkspaceDtoIn);
    } catch (e) {
      console.log(e);
    }
  },

  async dbDropCollection(collection) {
    return await TestHelper.executeDbScript(`db.${collection}.drop()`);
  },

  async dbUpdateKey(uuObject) {
    let change = { ...uuObject };
    return await TestHelper.executeDbScript(
      `db.${
        DB_LIST.collections.placesMain
      }.findOneAndUpdate( {awid: "${TestHelper.getAwid()}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

PlacesMainTestHelper.dbCollection = DB_LIST.collections;
PlacesMainTestHelper.States = {
  ACTIVE: "active",
  INITIAL: "initial",
  PASSIVE: "passive",
};

module.exports = {
  PlacesTestHelper,
  Helper: PlacesMainTestHelper,
  Workspace: TestHelper,
  Server,
};
