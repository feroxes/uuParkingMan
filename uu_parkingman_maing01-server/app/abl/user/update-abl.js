"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/user-error.js").Update;
const Warnings = require("../../api/warnings/user-warnings.js");
const Constants = require("../constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("userUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let user = await this.dao.get(awid, dtoIn.id);

    // 2.1
    if (!user) {
      throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    if (dtoIn.transport && !dtoIn.transport.type) dtoIn.transport.type = Constants.User.Transport.Types.CAR;

    // HDS 3
    try {
      user = await this.dao.update(awid, dtoIn.id, { ...user, ...dtoIn });
    } catch (e) {
      // 3.1
      throw new Errors.UserDaoUpdateFailed({ uuAppErrorMap }, { cause: e });
    }

    // HDS 4
    return {
      ...user,
      uuAppErrorMap,
    };
  }
}

module.exports = new UpdateAbl();
