"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/user-error.js");
const Warnings = require("../../api/warnings/user-warnings.js");
const Constants = require("../constants.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("userListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 2, 2.1
    const usersList = await this.dao.list(awid);

    //HDS 3
    return {
      ...usersList,
      uuAppErrorMap,
    };
  }
}

module.exports = new ListAbl();
