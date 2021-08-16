"use strict";
const CreateAbl = require("../../abl/parking-place/create-abl.js");

class ParkingPlaceController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ParkingPlaceController();
