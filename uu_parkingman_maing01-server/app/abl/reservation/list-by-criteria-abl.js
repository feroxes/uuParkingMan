"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").ListByCriteria;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");

class ListByCriteriaAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
  }

  async listByCriteria(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationListByCriteriaDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.listByCriteriaUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    if (dtoIn.filterMap) {
      if (dtoIn.filterMap.dayFrom && !dtoIn.filterMap.dayTo) {
        // 2.1
        throw new Errors.DayToParameterIsRequired({ uuAppErrorMap }, { dtoIn });
      } else if (dtoIn.filterMap.dayTo && !dtoIn.filterMap.dayFrom) {
        // 2.2
        throw new Errors.DayFromParameterIsRequired({ uuAppErrorMap }, { dtoIn });
      }
    }

    // HDS 3
    let reservationList = {};
    if (dtoIn.filterMap && Object.keys(dtoIn.filterMap).length) {
      // 3.1
      reservationList = await this.dao.listByCriteria(awid, dtoIn.filterMap);
    } else {
      // 3.2
      reservationList = await this.dao.list(awid);
    }

    // HDS 4
    return {
      ...reservationList,
      uuAppErrorMap,
    };
  }
}

module.exports = new ListByCriteriaAbl();
