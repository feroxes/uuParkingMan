"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/parkingman-main-error.js");
const Warnings = require("../../api/warnings/parkingman-warnings.js");
const { Schemas, States } = require("../constants.js");

class InitAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.PARKINGMAN);
  }

  async init(uri, dtoIn, uuAppErrorMap) {
    const awid = uri.getAwid();
    // HDS 1
    const uuParkingMan = await this.dao.getByAwid(awid);
    if (uuParkingMan && uuParkingMan.state === States.ACTIVE) {
      // 1.2
      throw new Errors.Init.ParkingManAlreadyInitialized({ uuAppErrorMap });
    }

    // HDS 2, 2.2, 2.2.1, 2.3, 2.3.1
    const validationResult = this.validator.validate("initDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemaCreateResults = Object.values(Schemas).map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // 2.1
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    // HDS 3
    const parkingmanCreateDtoIn = {
      awid,
      state: States.ACTIVE,
      ...dtoIn,
    };
    const parkingman = await this.dao.create(parkingmanCreateDtoIn);

    // HDS 4
    return {
      ...parkingman,
      uuAppErrorMap,
    };
  }
}

module.exports = new InitAbl();
