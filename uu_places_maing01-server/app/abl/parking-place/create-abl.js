"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/parking-place-error.js").Create;
const Warnings = require("../../api/warnings/parking-place-warnings.js");
const Constants = require("../constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("parkingPlaceCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.createUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let parkingPlace = await this.dao.getByTypeAndNumber(awid, dtoIn.type, dtoIn.number);

    // 2.1
    if (parkingPlace) {
      throw new Errors.ParkingPlaceAlreadyCreated({ uuAppErrorMap }, { parkingPlaceId: parkingPlace.id });
    }

    // HDS 3
    try {
      parkingPlace = await this.dao.create({ awid, ...dtoIn });
    } catch (e) {
      // 3.1
      throw new Errors.ParkingPlaceCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...parkingPlace,
      uuAppErrorMap,
    };
  }
}

module.exports = new CreateAbl();
