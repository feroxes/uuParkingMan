"use strict";
const PlacesObjectDao = require("./places-object-dao.js");

class UserMongo extends PlacesObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, uuIdentity: 1 }, { unique: true });
  }
}

module.exports = UserMongo;
