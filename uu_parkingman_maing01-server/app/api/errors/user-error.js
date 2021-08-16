"use strict";
const ParkingmanMainUseCaseError = require("./parkingman-main-use-case-error.js");
const USER_ERROR_PREFIX = `${ParkingmanMainUseCaseError.ERROR_PREFIX}user/`;

const Create = {
  UC_CODE: `${USER_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserAlreadyExists: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userAlreadyExists`;
      this.message = "User already exists.";
    }
  },

  UserCreateFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userCreateFailed`;
      this.message = "Failed to create user.";
    }
  },
};

module.exports = {
  Create,
};
