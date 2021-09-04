"use strict";
const CreateAbl = require("../../abl/reservation/create-abl.js");
const DeleteAbl = require("../../abl/reservation/delete-abl.js");

class ReservationController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new ReservationController();
