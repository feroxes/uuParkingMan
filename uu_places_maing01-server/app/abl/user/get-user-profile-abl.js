"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/user-error.js").GetUserProfile;
const Warnings = require("../../api/warnings/user-warnings.js");
const Constants = require("../constants.js");

class GetUserProfileAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async get(awid, dtoIn, session, authorizationResult, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("getUserProfileDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let user = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity);

    // 2.1
    if (!user) {
      throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { uuIdentity: dtoIn.uuIdentity });
    }

    // HDS 3
    const uuIdentity = session._identity._uuIdentity;
    const userProfiles = authorizationResult.getIdentityProfiles();

    if (uuIdentity !== dtoIn.uuIdentity && !userProfiles.includes(Constants.Profiles.AUTHORITIES)) {
      throw new Errors.UserDoesNotAuthorized({ uuAppErrorMap });
    }

    return { userProfiles, uuAppErrorMap };
  }
}

module.exports = new GetUserProfileAbl();
