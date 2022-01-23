"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/places-main-error.js").SendMessage;
const Constants = require("../constants.js");
const Warnings = require("../../api/warnings/places-warnings.js");
const Notifier = require("../../components/notifier.js");

class SendMessageAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Constants.Schemas.PLACES);
  }

  async send(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1, 1.2, 1.2.1, 1.3, 1.3.1
    const validationResult = this.validator.validate("placesSendMessageDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.sendMessageUnsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const notifierDtoIn = {
      message: dtoIn.message,
      error: Errors,
      uuAppErrorMap,
    };

    await Notifier.sendMessageToChanel(notifierDtoIn);

    return { uuAppErrorMap };
  }
}

module.exports = new SendMessageAbl();
