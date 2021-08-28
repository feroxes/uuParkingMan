const { TestHelper } = require("uu_appg01_server-test");

const DB_LIST = {
  collections: {
    reservation: "reservation",
  },
};

const ReservationTestHelper = {
  async reservationCreate(dtoIn = {}) {
    let _dtoIn = { ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("reservation/create", _dtoIn);
  },

  async reservationUpdate(dtoIn = {}) {
    let _dtoIn = { ...dtoIn };
    await TestHelper.login("Authorities");
    return await TestHelper.executePostCommand("reservation/update", _dtoIn);
  },

  async dbUpdateKey(uuObject, id) {
    let change = { ...uuObject };
    return await TestHelper.executeDbScript(
      `db.${DB_LIST.collections.category}.updateOne( {id: "${id}"}, {$set: ${JSON.stringify(change)} } )`
    );
  },
};

module.exports = ReservationTestHelper;
