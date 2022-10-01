"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Permission } = require("uu_appg01_server").Workspace;
const Errors = require("../../api/errors/user-error.js").Delete;
const Warnings = require("../../api/warnings/user-warnings.js");
const Constants = require("../constants.js");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("deleteUserProfileDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.deleteUserUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const user = await this.dao.get(awid, dtoIn.id);

    // 2.1
    if (!user) throw new Errors.UserDoesNotExist({ uuAppErrorMap });

    // HDS 3
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // 3.1
      throw new Errors.UserDeleteFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    await Permission.delete(awid, Constants.Profiles.USERS, [user.uuIdentity]);

    // HDS 5
    return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();
