"use strict";
const CreateAbl = require("../../abl/parking-place/create-abl.js");
const ListAbl = require("../../abl/parking-place/list-abl.js");

class ParkingPlaceController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ParkingPlaceController();
