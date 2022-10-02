"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { ObjectId } = require("mongodb");
const Errors = require("../../api/errors/reservation-error.js").Create;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");
const DayTimeHelper = require("../helpers/day-time-helper.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.userDao = DaoFactory.getDao(Constants.Schemas.USER);
    this.placesDao = DaoFactory.getDao(Constants.Schemas.PLACES);
    this.parkingPlaceDao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async create(awid, dtoIn, authorizationResult, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("reservationCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.createUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const uuPlaces = await this.placesDao.getByAwid(awid);

    // HDS 3
    const user = await this.userDao.get(awid, dtoIn.userId);
    // 3.1
    if (!user) {
      throw new Errors.UserDoesNotExist({ uuAppErrorMap }, { userId: dtoIn.userId });
    }
    //TODO add check that non-Authority should only book for themselves (like in update)

    // HDS 4
    const parkingPlace = await this.parkingPlaceDao.get(awid, dtoIn.parkingPlaceId);
    // 4.1
    if (!parkingPlace) {
      throw new Errors.ParkingPlaceDoesNotExist({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
    }

    // 4.2
    if (parkingPlace.isBlocked) {
      throw new Errors.ParkingPlaceIsBlockedForReservation({ uuAppErrorMap }, { parkingPlaceId: dtoIn.parkingPlaceId });
    }

    // HDS 5
    if (DayTimeHelper.isDateInPast(dtoIn.dayFrom) || DayTimeHelper.isDateInPast(dtoIn.dayTo)) {
      // 5.1
      throw new Errors.DateCouldNotBeInPast({ uuAppErrorMap }, { daysRange: `${dtoIn.dayFrom} - ${dtoIn.dayTo}` });
    }

    // HDS 6
    if (DayTimeHelper.getDateRage(dtoIn.dayFrom, dtoIn.dayTo) < 0) {
      // 6.1
      throw new Errors.DateToCouldNotBeLessThenDayFrom(
        { uuAppErrorMap },
        { dayFrom: dtoIn.dayFrom, dayTo: dtoIn.dayTo }
      );
    }

    // HDS 7
    const isRangeMoreThanLimit = DayTimeHelper.checkMaxReservationRange(dtoIn.dayFrom, dtoIn.dayTo);
    // 7.1
    if (isRangeMoreThanLimit) {
      throw new Errors.ReservationLimitExceeded(
        { uuAppErrorMap },
        { maxDaysOfReservation: Constants.Reservation.MAX_RESERVATION_DAYS }
      );
    }

    //HDS 8, 8.1
    if (!authorizationResult.getAuthorizedProfiles().includes(Constants.Profiles.AUTHORITIES)) {
      // 8.2
      const isReservationOpened = DayTimeHelper.isReservationOpened(
        uuPlaces.reservationsConfig,
        dtoIn.dayFrom,
        dtoIn.dayTo
      );
      // 8.3
      if (!isReservationOpened) {
        // 8.3.A
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

    dtoIn.userId = ObjectId(dtoIn.userId);
    dtoIn.parkingPlaceId = ObjectId(dtoIn.parkingPlaceId);
    // HDS 9
    let reservations = await this.dao.listByCriteria(awid, {
      parkingPlaceId: dtoIn.parkingPlaceId,
      ...DayTimeHelper.prepareFilterMapByDays(dtoIn.dayFrom, dtoIn.dayTo),
    });

    // 9.1
    if (reservations.itemList.length) {
      throw new Errors.ParkingPlaceAlreadyReserved(
        { uuAppErrorMap },
        { reservedFrom: reservations.itemList[0].dayFrom, reservedTo: reservations.itemList[0].dayTo }
      );
    }

    // HDS 10
    let reservation = null;
    try {
      reservation = await this.dao.create({ awid, ...dtoIn });
    } catch (e) {
      // 10.1
      throw new Errors.ReservationCreateFailed({ uuAppErrorMap }, e);
    }
    reservation.user = user;
    reservation.parkingPlace = parkingPlace;
    // HDS 11
    return {
      ...reservation,
      uuAppErrorMap,
    };
  }
}

module.exports = new CreateAbl();
