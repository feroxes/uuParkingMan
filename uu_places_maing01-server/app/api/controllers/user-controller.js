"use strict";
const CreateAbl = require("../../abl/user/create-abl.js");
const ListAbl = require("../../abl/user/list-abl.js");
const UpdateAbl = require("../../abl/user/update-abl.js");
const GetUserProfileAbl = require("../../abl/user/get-user-profile-abl.js");
const DeleteAbl = require("../../abl/user/delete-abl.js");

class UserController {
  getUserProfile(ucEnv) {
    return GetUserProfileAbl.get(
      ucEnv.getUri().getAwid(),
      ucEnv.getDtoIn(),
      ucEnv.getSession(),
      ucEnv.getAuthorizationResult()
    );
  }
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new UserController();
