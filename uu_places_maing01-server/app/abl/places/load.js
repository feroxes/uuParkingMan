"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { Schemas } = require("../constants.js");

class LoadAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.PLACES);
  }

  async load(uri, authorizationResult, uuAppErrorMap) {
    const awid = uri.getAwid();
    const uuPlaces = await this.dao.getByAwid(awid);
    return {
      ...uuPlaces,
      identityProfiles: authorizationResult.getIdentityProfiles(),
      uuAppErrorMap,
    };
  }
}

module.exports = new LoadAbl();
