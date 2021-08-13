"use strict";
const InitAbl = require("../../abl/parkingman/init.js");

class ParkingmanMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ParkingmanMainController();
