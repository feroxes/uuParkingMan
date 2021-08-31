"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").Update;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");
const DayTimeHelper = require("../helpers/day-time-helper.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.userDao = DaoFactory.getDao(Constants.Schemas.USER);
    this.reservationDao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.parkingPlaceDao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let reservation = await this.reservationDao.get(awid, dtoIn.reservationId);
    // 2.1
    //fixme {reservationId: dtoIn.id}
    if (!reservation) throw new Errors.ReservationDoesNotExist({ uuAppErrorMap }, { reservation: dtoIn.reservationId });

    // HDS 3
    const sys = reservation.sys;
    sys.rev = dtoIn.revision;
    delete dtoIn.revision;

    // HDS 4
    if (dtoIn.userId) {
      // 4.1
      const user = await this.userDao.get(awid, dtoIn.userId);
      // 4.2
      if (!user) {
        throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.userId });
      }
    }
    //fixme I think we need to add one more additional check. If the user who invokes the command is not Authorities and
    // reservation.userId !== dtoIn.userId, he couldn't update reservation.
    // otherwise, for example I, will be able to update your reservation.

    // HDS 5
    if (dtoIn.parkingPlaceId) {
      // 5.1
      const parkingPlace = await this.parkingPlaceDao.get(awid, dtoIn.parkingPlaceId);
      // 5.2
      if (!parkingPlace) {
        throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
      }
    }

    //TODO HDS 6,7,8 could be moved to separate server component. I think we will check isDateInPast, getDateRage, checkMaxReservationRange
    // in a lot off places.

    // HDS 6
    if (DayTimeHelper.isDateInPast(dtoIn.dayFrom) || DayTimeHelper.isDateInPast(dtoIn.dayTo)) {
      // 6.1
      throw new Errors.DateCouldNotBeInPast({ uuAppErrorMap }, { daysRange: `${dtoIn.dayFrom} - ${dtoIn.dayTo}` });
    }

    // HDS 7
    if (DayTimeHelper.getDateRage(dtoIn.dayFrom, dtoIn.dayTo) < 0) {
      // 7.1
      throw new Errors.DateToCouldNotBeLessThenDayFrom(
        { uuAppErrorMap },
        { dayFrom: dtoIn.dayFrom, dayTo: dtoIn.dayTo }
      );
    }

    // HDS 8
    const isRangeMoreThanLimit = DayTimeHelper.checkMaxReservationRange(dtoIn.dayFrom, dtoIn.dayTo);
    // 8.1
    if (isRangeMoreThanLimit) {
      throw new Errors.ReservationLimitExceeded(
        { uuAppErrorMap },
        { maxDaysOfReservation: Constants.Reservation.MAX_RESERVATION_DAYS }
      );
    }

    //TODO in create & update: check if user has another reservation in these dates

    // HDS 9
    let reservations = await this.dao.listByParkingPlaceId(awid, dtoIn.parkingPlaceId || reservation.parkingPlaceId);
    // 9.1
    if (reservations.itemList.length) {
      //TODO need to discuss this step
      const blockingReservation = reservations.itemList.find(
        (res) =>
          DayTimeHelper.isRangeOverlapping(
            dtoIn.dayFrom || reservation.dayFrom,
            dtoIn.dayTo || reservation.dayTo,
            res.dayFrom,
            res.dayTo
          ) && res.id.toString() !== dtoIn.reservationId
      );
      if (blockingReservation) {
        // 9.2
        throw new Errors.ParkingPlaceAlreadyReserved(
          { uuAppErrorMap },
          {
            reservedFrom: blockingReservation.dayFrom,
            reservedTo: blockingReservation.dayTo,
          }
        );
      }
    }

    // HDS 10
    try {
      reservation = await this.dao.update(awid, dtoIn.reservationId, { sys, ...dtoIn });
    } catch (e) {
      // 10.1
      throw new Errors.ReservationUpdateFailed({ uuAppErrorMap }, e);
    }

    // HDS 11
    return {
      ...reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new UpdateAbl();
