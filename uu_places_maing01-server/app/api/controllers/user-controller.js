"use strict";
const CreateAbl = require("../../abl/user/create-abl.js");
const ListAbl = require("../../abl/user/list-abl.js");
const UpdateAbl = require("../../abl/user/update-abl.js");

class UserController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new UserController();
