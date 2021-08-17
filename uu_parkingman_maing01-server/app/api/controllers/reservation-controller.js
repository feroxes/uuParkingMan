"use strict";
const CreateAbl = require("../../abl/reservation/create-abl.js");

class ReservationController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ReservationController();
