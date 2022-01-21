"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/places-main-error.js").Update;
const Constants = require("../constants.js");
const Warnings = require("../../api/warnings/places-warnings.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.PLACES);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("placesLoadDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let places = await this.dao.getByAwid(awid);
    if (!places) {
      // 2.1
      throw new Errors.PlacesDoesNotExist({ uuAppErrorMap });
    }

    // HDS 3
    const updateDtoIn = {
      ...places,
      ...dtoIn,
    };

    // 3.1
    try {
      places = await this.dao.update(awid, places.id, updateDtoIn);
    } catch (e) {
      // 3.1.A
      throw new Errors.PlacesDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return { ...places, uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
