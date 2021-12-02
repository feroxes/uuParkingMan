"use strict";
const PlacesObjectDao = require("./places-object-dao.js");

class ParkingPlaceMongo extends PlacesObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, number: 1 });
    await super.createIndex({ awid: 1, type: 1 });
  }

  async getByTypeAndNumber(awid, type, number) {
    return super.findOne({ awid, type, number });
  }
}

module.exports = ParkingPlaceMongo;
