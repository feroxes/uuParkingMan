"use strict";
const ParkingmanObjectDao = require("./parkingman-object-dao.js");

class ParkingManMainMongo extends ParkingmanObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
}

module.exports = ParkingManMainMongo;
