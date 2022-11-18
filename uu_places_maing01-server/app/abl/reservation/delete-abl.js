"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").Delete;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Notifier = require("../../components/notifier.js");
const NotifyHelper = require("../helpers/notify-helper.js");
const DateTimeHelper = require("../helpers/day-time-helper.js");
const Constants = require("../constants.js");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.userDao = DaoFactory.getDao(Constants.Schemas.USER);
    this.parkingPlaceDao = DaoFactory.getDao(Constants.Schemas.PARKING_PLACE);
  }

  async delete(uri, awid, dtoIn, authorizationResult, uuAppErrorMap = {}) {
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

    const parkingPlace = await this.parkingPlaceDao.get(awid, reservation.parkingPlaceId);

    // HDS 3
    if (!authorizationResult.getAuthorizedProfiles().includes(Constants.Profiles.AUTHORITIES)) {
      //HDS 3.1
      const currentReservationUser = await this.userDao.get(awid, reservation.userId);

      //HDS 3.2
      const sessionUuIdentity = authorizationResult.getUuIdentity();
      if (sessionUuIdentity !== currentReservationUser?.uuIdentity) {
        throw new Errors.ReservationBelongsToDifferentUser(
          { uuAppErrorMap },
          { currentReservationUser: currentReservationUser.uuIdentity }
        );
      }
    }

    // HDS 4
    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      // 4.1
      throw new Errors.ReservationDeleteFailed({ uuAppErrorMap }, e);
    }

    // HDS 5
    if (dtoIn.sendMessage) {
      const { dayFrom, dayTo } = reservation;
      const timeSlot = DateTimeHelper.getTimeSlotForNotification(dayFrom, dayTo);
      const notifierDtoIn = {
        message: NotifyHelper.getEmptyPlaceMessage(parkingPlace.number, timeSlot, uri),
        error: Errors,
        uuAppErrorMap,
      };

      await Notifier.sendMessageToChanel(notifierDtoIn);
    }
    // HDS 5
    return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();
