"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").Delete;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");
const DayTimeHelper = require("../helpers/day-time-helper.js");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.deleteUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let reservation = await this.dao.get(awid, dtoIn.id);
    // 2.1
    if (!reservation) {
      throw new Errors.ReservationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 3
    try {
      reservation = await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // 3.1
      throw new Errors.ReservationDeleteFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new DeleteAbl();
