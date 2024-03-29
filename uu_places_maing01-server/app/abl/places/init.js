"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/places-main-error.js").Init;
const Warnings = require("../../api/warnings/places-warnings.js");
const { Schemas, States } = require("../constants.js");

class InitAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.PLACES);
  }

  async init(uri, dtoIn, uuAppErrorMap) {
    const awid = uri.getAwid();
    // HDS 1
    const uuPlaces = await this.dao.getByAwid(awid);
    if (uuPlaces && uuPlaces.state === States.ACTIVE) {
      // 1.2
      throw new Errors.PlacesAlreadyInitialized({ uuAppErrorMap });
    }

    // HDS 2, 2.2, 2.2.1, 2.3, 2.3.1
    const validationResult = this.validator.validate("initDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.initUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const schemaCreateResults = Object.values(Schemas).map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // 2.1
        throw new Errors.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    // HDS 3
    const placesCreateDtoIn = {
      awid,
      state: States.ACTIVE,
      ...dtoIn,
    };

    let places = {};
    // 3.1
    try {
      places = await this.dao.create(placesCreateDtoIn);
    } catch (e) {
      // 3.1.1
      throw new Errors.PlacesCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...places,
      uuAppErrorMap,
    };
  }
}

module.exports = new InitAbl();
