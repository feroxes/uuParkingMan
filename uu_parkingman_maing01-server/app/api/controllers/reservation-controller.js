"use strict";
const CreateAbl = require("../../abl/reservation/create-abl.js");
const ListByCriteriaAbl = require("../../abl/reservation/list-by-criteria-abl.js");
const DeleteAbl = require("../../abl/reservation/delete-abl.js");

class ReservationController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  listByCriteria(ucEnv) {
    return ListByCriteriaAbl.listByCriteria(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }
}

module.exports = new ReservationController();
