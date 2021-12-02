"use strict";
const PlacesObjectDao = require("./places-object-dao.js");

class PlacesMainMongo extends PlacesObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
}

module.exports = PlacesMainMongo;
