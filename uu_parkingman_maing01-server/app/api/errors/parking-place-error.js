"use strict";
const ParkingmanMainUseCaseError = require("./parkingman-main-use-case-error.js");
const PARKING_PLACE_ERROR_PREFIX = `${ParkingmanMainUseCaseError.ERROR_PREFIX}parkingPlace/`;

const Create = {
  UC_CODE: `${PARKING_PLACE_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ParkingPlaceAlreadyCreated: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceAlreadyCreated`;
      this.message = "Parking place already created.";
    }
  },

  ParkingPlaceCreateFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceCreateFailed`;
      this.message = "Failed to create parking place.";
    }
  },
};

module.exports = {
  Create,
};
