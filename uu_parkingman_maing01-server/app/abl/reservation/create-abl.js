"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").Create;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");
const DayTimeHelper = require("../helpers/day-time-helper.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.userDao = DaoFactory.getDao(Constants.Schemas.USER);
    this.parkingPlaceDao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.createUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const user = await this.userDao.get(awid, dtoIn.userId);
    // 2.1
    if (!user) {
      throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.userId });
    }

    // HDS 3
    const parkingPlace = await this.parkingPlaceDao.get(awid, dtoIn.parkingPlaceId);
    // 3.1
    if (!parkingPlace) {
      throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
    }

    // HDS 4
    if (DayTimeHelper.isDateInPast(dtoIn.dayFrom) || DayTimeHelper.isDateInPast(dtoIn.dayTo)) {
      throw new Errors.DateCouldNotBeInPast({ uuAppErrorMap }, { daysRange: `${dtoIn.dayFrom} - ${dtoIn.dayTo}` });
    }

    // HDS 5
    if (DayTimeHelper.getDateRage(dtoIn.dayFrom, dtoIn.dayTo) < 0) {
      throw new Errors.DateToCouldNotBeLessThenDayFrom(
        { uuAppErrorMap },
        { dayFrom: dtoIn.dayFrom, dayTo: dtoIn.dayTo }
      );
    }

    // HDS 6
    const isRangeMoreThanLimit = DayTimeHelper.checkMaxReservationRange(dtoIn.dayFrom, dtoIn.dayTo);
    // 6.1
    if (isRangeMoreThanLimit) {
      throw new Errors.ReservationLimitExceeded(
        { uuAppErrorMap },
        { maxDaysOfReservation: Constants.Reservation.MAX_RESERVATION_DAYS }
      );
    }

    // HDS 7
    let reservations = await this.dao.listByParkingPlaceId(awid, dtoIn.parkingPlaceId);

    // 7.1
    if (reservations.itemList.length) {
      const reservation = reservations.itemList.find((res) =>
        DayTimeHelper.isBetween(dtoIn.dayFrom, res.dayFrom, res.dayTo)
      );
      if (reservation) {
        // 7.2
        throw new Errors.ParkingPlaceAlreadyReserved(
          { uuAppErrorMap },
          { reservedFrom: reservation.dayFrom, reservedTo: reservation.dayTo }
        );
      }
    }

    // HDS 8
    let reservation = null;
    try {
      reservation = await this.dao.create({ awid, ...dtoIn });
    } catch (e) {
      // 8.1
      throw new Errors.ReservationCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 9
    return {
      ...reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new CreateAbl();
