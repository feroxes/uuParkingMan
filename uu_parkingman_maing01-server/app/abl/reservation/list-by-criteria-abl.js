"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { ObjectId } = require("mongodb");
const Errors = require("../../api/errors/reservation-error.js").ListByCriteria;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");
const DayTimeHelper = require("../helpers/day-time-helper.js");

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
      if (
        dtoIn.filterMap.dayFrom &&
        dtoIn.filterMap.dayTo &&
        DayTimeHelper.getDateRage(dtoIn.filterMap.dayFrom, dtoIn.filterMap.dayTo) < 0
      ) {
        // 2.1
        throw new Errors.DateToCouldNotBeLessThenDayFrom(
          { uuAppErrorMap },
          { dayFrom: dtoIn.filterMap.dayFrom, dayTo: dtoIn.filterMap.dayTo }
        );
      } else if (dtoIn.filterMap.dayFrom && !dtoIn.filterMap.dayTo) {
        // 2.2
        throw new Errors.DayToParameterIsRequired({ uuAppErrorMap }, { dtoIn });
      } else if (!dtoIn.filterMap.dayFrom && dtoIn.filterMap.dayTo) {
        // 2.3
        throw new Errors.DayFromParameterIsRequired({ uuAppErrorMap }, { dtoIn });
      }
    }

    //HDS 3
    const filterMap = {
      ...dtoIn.filterMap,
      ...(dtoIn.filterMap && {
        ...DayTimeHelper.prepareFilterMapByDays(dtoIn.filterMap.dayFrom, dtoIn.filterMap.dayTo),
      }),
    };
    if (!dtoIn.pageInfo) {
      dtoIn.pageInfo = {
        pageIndex: Constants.DEFAULT_PAGE_INDEX,
        pageSize: Constants.DEFAULT_PAGE_SIZE,
      };
    } else {
      if (!dtoIn.pageInfo.hasOwnProperty("pageIndex")) dtoIn.pageInfo.pageIndex = Constants.DEFAULT_PAGE_INDEX;
      if (!dtoIn.pageInfo.hasOwnProperty("pageSize")) dtoIn.pageInfo.pageSize = Constants.DEFAULT_PAGE_SIZE;
    }

    filterMap.userId && (filterMap.userId = ObjectId(filterMap.userId));
    filterMap.parkingPlaceId && (filterMap.parkingPlaceId = ObjectId(filterMap.parkingPlaceId));

    // HDS 4
    const reservationList = await this.dao.listByCriteria(awid, filterMap, [], dtoIn.pageInfo);

    // HDS 5
    return {
      ...reservationList,
      uuAppErrorMap,
    };
  }
}

module.exports = new ListByCriteriaAbl();
