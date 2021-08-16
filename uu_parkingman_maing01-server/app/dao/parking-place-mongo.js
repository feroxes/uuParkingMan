"use strict";
const ParkingmanObjectDao = require("./parkingman-object-dao.js");

class ParkingPlaceMongo extends ParkingmanObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, number: 1 });
    await super.createIndex({ awid: 1, type: 1 });
  }

  async getByTypeAndNumber(awid, type, number) {
    return super.findOne({ awid, type, number });
  }
}

module.exports = ParkingPlaceMongo;
