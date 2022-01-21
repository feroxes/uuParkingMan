"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/reservation-error.js").Delete;
const Warnings = require("../../api/warnings/reservation-warnings.js");
const Constants = require("../constants.js");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.RESERVATION);
    this.userDao = DaoFactory.getDao(Constants.Schemas.USER);
  }

  async delete(awid, dtoIn, authorizationResult, uuAppErrorMap = {}) {
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
    return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();
