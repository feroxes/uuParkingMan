"use strict";
const CreateAbl = require("../../abl/reservation/create-abl.js");
const UpdateAbl = require("../../abl/reservation/update-abl.js");

class ReservationController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ReservationController();
