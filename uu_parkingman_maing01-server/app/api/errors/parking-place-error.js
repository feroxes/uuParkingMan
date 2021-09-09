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

const List = {
  UC_CODE: `${PARKING_PLACE_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Update = {
  UC_CODE: `${PARKING_PLACE_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ParkingPlaceDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceDoesNotExist`;
      this.message = "Parking place does not exist.";
    }
  },

  ParkingPlaceDaoUpdateFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceDaoUpdateFailed`;
      this.message = "Parking place DAO update failed.";
    }
  },
};

module.exports = {
  Update,
  List,
  Create,
};
