"use strict";
const InitAbl = require("../../abl/places/init.js");
const LoadAbl = require("../../abl/places/load.js");
const UpdateAbl = require("../../abl/places/update-abl.js");
const SendMessageAbl = require("../../abl/places/send-message-abl.js");
const WorkspaceLoadAbl = require("../../abl/places/workspace-load-abl.js");

class PlacesMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  load(ucEnv) {
    return LoadAbl.load(ucEnv.getUri(), ucEnv.getAuthorizationResult());
  }
  workspaceLoad(ucEnv) {
    return WorkspaceLoadAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  sendMessage(ucEnv) {
    return SendMessageAbl.send(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new PlacesMainController();
