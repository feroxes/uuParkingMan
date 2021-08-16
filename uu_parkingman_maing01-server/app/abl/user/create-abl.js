"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/user-error.js");
const Warnings = require("../../api/warnings/user-warnings.js");
const Constants = require("../constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async create(awid, dtoIn, uuAppErrorMap) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    await this.dao.createSchema();
    const validationResult = this.validator.validate("userCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.initUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // 1.4
    if (!dtoIn.transport.type) dtoIn.transport.type = Constants.User.Transport.Types.CAR;

    // HDS 2
    let user = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity);

    // 2.1
    if (user) {
      throw new Errors.Create.UserAlreadyExists({ uuAppErrorMap }, { uuIdentity: dtoIn.uuIdentity });
    }

    // HDS 3
    try {
      user = await this.dao.create({ awid, ...dtoIn });
    } catch (e) {
      // 3.1
      throw new Errors.Create.UserCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...user,
      uuAppErrorMap,
    };
  }
}

module.exports = new CreateAbl();
