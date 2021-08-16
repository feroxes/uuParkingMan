"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/parking-place-error.js").List;
const Warnings = require("../../api/warnings/parking-place-warnings.js");
const Constants = require("../constants.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("parkingPlaceListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.createUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2, 2.1
    const parkingPlaceList = await this.dao.list(awid);

    //HDS 3
    return {
      ...parkingPlaceList,
      uuAppErrorMap,
    };
  }
}

module.exports = new ListAbl();
