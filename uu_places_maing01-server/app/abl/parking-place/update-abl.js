"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/parking-place-error.js").Update;
const Warnings = require("../../api/warnings/parking-place-warnings.js");
const Constants = require("../constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("parkingPlaceUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let parkingPlace = await this.dao.get(awid, dtoIn.id);

    // 2.1
    if (!parkingPlace) {
      throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.id });
    }

    // HDS 3
    try {
      parkingPlace = await this.dao.update(awid, dtoIn.id, { ...parkingPlace, ...dtoIn });
    } catch (e) {
      throw new Errors.ParkingPlaceDaoUpdateFailed({ uuAppErrorMap }, { parkingPlace: parkingPlace.id });
    }

    // HDS 4
    return { ...parkingPlace, uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
