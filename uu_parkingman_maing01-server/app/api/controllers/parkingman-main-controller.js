"use strict";
const ParkingmanMainAbl = require("../../abl/parkingman-main-abl.js");

class ParkingmanMainController {
  init(ucEnv) {
    return ParkingmanMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ParkingmanMainController();
