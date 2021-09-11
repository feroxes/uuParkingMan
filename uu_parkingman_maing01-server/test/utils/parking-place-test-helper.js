const { TestHelper } = require("uu_appg01_server-test");
const DefaultDtoIn = require("../default-dto-in");

const DB_LIST = {
  collections: {
    parkingPlace: "parkingPlace",
  },
};

const ParkingPlaceTestHelper = {
  async parkingPlaceCreate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.ParkingPlace.Create, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("parkingPlace/create", _dtoIn);
  },
  async parkingPlaceList(dtoIn = {}) {
    let _dtoIn = { ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executeGetCommand("parkingPlace/list", _dtoIn);
  },
  async parkingPlaceUpdate(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.ParkingPlace.Update, ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("parkingPlace/update", _dtoIn);
  },
  async dbUpdateKey(uuObject, id) {
    let change = { ...uuObject };
    return await TestHelper.executeDbScript(
      `db.${DB_LIST.collections.category}.updateOne( {id: "${id}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

module.exports = ParkingPlaceTestHelper;
