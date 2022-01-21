"use strict";
const InitAbl = require("../../abl/places/init.js");
const LoadAbl = require("../../abl/places/load.js");
const UpdateAbl = require("../../abl/places/update-abl.js");

class PlacesMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  load(ucEnv) {
    return LoadAbl.load(ucEnv.getUri(), ucEnv.getAuthorizationResult());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PlacesMainController();
