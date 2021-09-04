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

  async update(awid, dtoIn, authorizationResult, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.updateUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    let reservation = await this.reservationDao.get(awid, dtoIn.id);
    // 2.1
    if (!reservation) throw new Errors.ReservationDoesNotExist({ uuAppErrorMap }, { reservation: dtoIn.id });

    // HDS 3
    if (!authorizationResult.getAuthorizedProfiles().includes("Authorities")) {

      //HDS 3.1
      const currentReservationUser = await this.userDao.get(awid, reservation.userId);

      //HDS 3.2
      if (authorizationResult.getUuIdentity() !== currentReservationUser?.uuIdentity) {
        throw new Errors.ReservationBelongsToDifferentUser(
          { uuAppErrorMap },
          { currentReservationUser: currentReservationUser.uuIdentity }
        );
      }

      //HDS 3.3
      if (dtoIn.userId && currentReservationUser?.userId !== dtoIn.userId) {
        throw new Errors.NotAllowedToChangeUser(
          { uuAppErrorMap },
          { currentReservationUser: currentReservationUser.uuIdentity }
        );
      }

      //TODO add logic to limit update of past reservations by non-Authorities; maybe (reservation.DayTo >= today && dtoIn.DayTo >= today) ?
    }

    // HDS 4
    const sys = reservation.sys;
    sys.rev = dtoIn.revision;
    delete dtoIn.revision;
    dtoIn.dayFrom = dtoIn.dayFrom || reservation.dayFrom;
    dtoIn.dayTo = dtoIn.dayTo || reservation.dayTo;

    // HDS 5
    if (dtoIn.userId) {
      // 5.1
      const user = await this.userDao.get(awid, dtoIn.userId);
      // 5.2
      if (!user) {
        throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.userId });
      }
    }

    // HDS 6
    if (dtoIn.parkingPlaceId) {
      // 6.1
      const parkingPlace = await this.parkingPlaceDao.get(awid, dtoIn.parkingPlaceId);
      // 6.2
      if (!parkingPlace) {
        throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
      }
    }

    //TODO HDS 7,8,9 could be moved to separate server component. I think we will check isDateInPast, getDateRage, checkMaxReservationRange
    // in a lot off places.

    // HDS 7
    if (DayTimeHelper.isDateInPast(dtoIn.dayFrom) || DayTimeHelper.isDateInPast(dtoIn.dayTo)) {
      // 7.1
      throw new Errors.DateCouldNotBeInPast({ uuAppErrorMap }, { daysRange: `${dtoIn.dayFrom} - ${dtoIn.dayTo}` });
    }

    // HDS 8
    if (DayTimeHelper.getDateRage(dtoIn.dayFrom, dtoIn.dayTo) < 0) {
      // 8.1
      throw new Errors.DateToCouldNotBeLessThenDayFrom(
        { uuAppErrorMap },
        { dayFrom: dtoIn.dayFrom, dayTo: dtoIn.dayTo }
      );
    }

    // HDS 9
    const isRangeMoreThanLimit = DayTimeHelper.checkMaxReservationRange(dtoIn.dayFrom, dtoIn.dayTo);
    // 9.1
    if (isRangeMoreThanLimit) {
      throw new Errors.ReservationLimitExceeded(
        { uuAppErrorMap },
        { maxDaysOfReservation: Constants.Reservation.MAX_RESERVATION_DAYS }
      );
    }

    //TODO in create & update: check if user has another reservation in these dates

    // HDS 10
    let reservations = await this.dao.listByParkingPlaceId(awid, dtoIn.parkingPlaceId || reservation.parkingPlaceId);
    // 10.1
    if (reservations.itemList.length) {
      //TODO need to discuss this step
      const blockingReservation = reservations.itemList.find(
        (res) =>
          DayTimeHelper.isRangeOverlapping(dtoIn.dayFrom, dtoIn.dayTo, res.dayFrom, res.dayTo) &&
          res.id.toString() !== dtoIn.id
      );
      if (blockingReservation) {
        // 10.2
        throw new Errors.ParkingPlaceAlreadyReserved(
          { uuAppErrorMap },
          {
            reservedFrom: blockingReservation.dayFrom,
            reservedTo: blockingReservation.dayTo,
          }
        );
      }
    }

    // HDS 11
    try {
      reservation = await this.dao.update(awid, dtoIn.id, { sys, ...dtoIn });
    } catch (e) {
      // 11.1
      throw new Errors.ReservationUpdateFailed({ uuAppErrorMap }, e);
    }

    // HDS 12
    return {
      ...reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new UpdateAbl();
