"use strict";
const InitAbl = require("../../abl/parkingman/init.js");
const LoadAbl = require("../../abl/parkingman/load.js");

class ParkingmanMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  load(ucEnv) {
    return LoadAbl.load(ucEnv.getUri());
  }
}

module.exports = new ParkingmanMainController();
