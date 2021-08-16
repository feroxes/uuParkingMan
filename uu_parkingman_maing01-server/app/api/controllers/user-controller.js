"use strict";
const CreateAbl = require("../../abl/user/create-abl.js");

class UserController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new UserController();
