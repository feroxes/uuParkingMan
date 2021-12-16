"use strict";
const InitAbl = require("../../abl/places/init.js");
const LoadAbl = require("../../abl/places/load.js");

class PlacesMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  load(ucEnv) {
    return LoadAbl.load(ucEnv.getUri(), ucEnv.getAuthorizationResult());
  }
}

module.exports = new PlacesMainController();
