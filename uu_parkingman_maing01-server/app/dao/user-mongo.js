"use strict";
const ParkingmanObjectDao = require("./parkingman-object-dao.js");

class UserMongo extends ParkingmanObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, uuIdentity: 1 }, { unique: true });
  }
}

module.exports = UserMongo;
