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
    this.placesDao = DaoFactory.getDao(Constants.Schemas.PLACES);
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
    const uuPlaces = await this.placesDao.getByAwid(awid);

    // HDS 3
    let reservation = await this.reservationDao.get(awid, dtoIn.id);
    // 3.1
    if (!reservation) throw new Errors.ReservationDoesNotExist({ uuAppErrorMap }, { reservation: dtoIn.id });

    // HDS 4
    if (!authorizationResult.getAuthorizedProfiles().includes(Constants.Profiles.AUTHORITIES)) {
      // 4.1
      const currentReservationUser = await this.userDao.get(awid, reservation.userId);

      // 4.2
      const sessionUuIdentity = authorizationResult.getUuIdentity();
      if (sessionUuIdentity !== currentReservationUser?.uuIdentity) {
        throw new Errors.ReservationBelongsToDifferentUser(
          { uuAppErrorMap },
          { currentReservationUser: currentReservationUser.uuIdentity }
        );
      }

      // 4.3
      if (dtoIn.userId && currentReservationUser?.userId !== dtoIn.userId) {
        throw new Errors.NotAllowedToChangeUser(
          { uuAppErrorMap },
          { currentReservationUser: currentReservationUser.uuIdentity }
        );
      }

      //TODO add logic to limit update of past reservations by non-Authorities; maybe (reservation.DayTo >= today && dtoIn.DayTo >= today) ?
    }

    // HDS 5
    if (dtoIn.revision !== reservation.sys.rev) {
      // 5.1
      throw new Errors.ReservationRevisionDoesNotMatch({ uuAppErrorMap }, { userId: dtoIn.userId });
    }
    const sys = reservation.sys;
    sys.rev = dtoIn.revision;
    delete dtoIn.revision;
    dtoIn.dayFrom = dtoIn.dayFrom || reservation.dayFrom;
    dtoIn.dayTo = dtoIn.dayTo || reservation.dayTo;

    // HDS 6
    let user = null;
    if (dtoIn.userId) {
      // 6.1
      user = await this.userDao.get(awid, dtoIn.userId);
      // 6.2
      if (!user) {
        throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.userId });
      }
    }

    // HDS 7
    let parkingPlace = null;
    if (dtoIn.parkingPlaceId) {
      // 7.1
      parkingPlace = await this.parkingPlaceDao.get(awid, dtoIn.parkingPlaceId);
      // 7.2
      if (!parkingPlace) {
        throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
      }
    }

    // HDS 8
    if (DayTimeHelper.isDateInPast(dtoIn.dayFrom) || DayTimeHelper.isDateInPast(dtoIn.dayTo)) {
      // 8.1
      throw new Errors.DateCouldNotBeInPast({ uuAppErrorMap }, { daysRange: `${dtoIn.dayFrom} - ${dtoIn.dayTo}` });
    }

    // HDS 9
    if (DayTimeHelper.getDateRage(dtoIn.dayFrom, dtoIn.dayTo) < 0) {
      // 9.1
      throw new Errors.DateToCouldNotBeLessThenDayFrom(
        { uuAppErrorMap },
        { dayFrom: dtoIn.dayFrom, dayTo: dtoIn.dayTo }
      );
    }

    // HDS 10
    const isRangeMoreThanLimit = DayTimeHelper.checkMaxReservationRange(dtoIn.dayFrom, dtoIn.dayTo);
    // 10.1
    if (isRangeMoreThanLimit) {
      throw new Errors.ReservationLimitExceeded(
        { uuAppErrorMap },
        { maxDaysOfReservation: Constants.Reservation.MAX_RESERVATION_DAYS }
      );
    }

    // HDS 11, 11.1
    if (!authorizationResult.getAuthorizedProfiles().includes(Constants.Profiles.AUTHORITIES)) {
      // 11.2
      const isReservationOpened = DayTimeHelper.isReservationOpened(
        uuPlaces.reservationsConfig,
        dtoIn.dayFrom,
        dtoIn.dayTo
      );
      // 11.3
      if (!isReservationOpened) {
        // 11.3.A
        throw new Errors.ReservationClosed(
          { uuAppErrorMap },
          {
            reservationStartsAt: `${DayTimeHelper.getDayName(
              uuPlaces.reservationsConfig.dayOfStartReservations - 1
            )}, ${uuPlaces.reservationsConfig.hourOfStartReservations}:00`,
          }
        );
      }
    }
    //TODO in create & update: check if user has another reservation in these dates

    // HDS 12
    let reservations = await this.dao.listByCriteria(awid, {
      parkingPlaceId: dtoIn.parkingPlaceId || reservation.parkingPlaceId,
      dayFrom: dtoIn.dayTo,
      dayTo: dtoIn.dayFrom,
    });
    // 12.1
    if (reservations.itemList.length) {
      const blockingReservation = reservations.itemList.find((res) => res.id.toString() !== dtoIn.id);
      if (blockingReservation) {
        throw new Errors.ParkingPlaceAlreadyReserved(
          { uuAppErrorMap },
          { reservedFrom: blockingReservation.dayFrom, reservedTo: blockingReservation.dayTo }
        );
      }
    }

    // HDS 13
    try {
      reservation = await this.dao.update(awid, dtoIn.id, { sys, ...dtoIn });
    } catch (e) {
      // 13.1
      throw new Errors.ReservationUpdateFailed({ uuAppErrorMap }, e);
    }
    reservation.user = user;
    reservation.parkingPlace = parkingPlace;
    // HDS 14
    return {
      ...reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new UpdateAbl();
