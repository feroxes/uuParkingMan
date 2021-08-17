const { TestHelper } = require("uu_appg01_server-test");
const { Server } = require("./uuapp-mock-server");
const DefaultDtoIn = require("../default-dto-in");

const DB_LIST = {
  collections: {
    parkingmanMain: "parkingmanMain",
  },
};

const ParkingmanMainTestHelper = {
  async initUuSubApp(dtoIn = {}) {
    const initAppWorkspaceDtoIn = {
      ...DefaultDtoIn.uuParkingMan.Init,
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
        DB_LIST.collections.parkingmanMain
      }.findOneAndUpdate( {awid: "${TestHelper.getAwid()}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

ParkingmanMainTestHelper.dbCollection = DB_LIST.collections;
ParkingmanMainTestHelper.States = {
  ACTIVE: "active",
  INITIAL: "initial",
  PASSIVE: "passive",
};

module.exports = {
  Helper: ParkingmanMainTestHelper,
  Workspace: TestHelper,
  Server,
};
