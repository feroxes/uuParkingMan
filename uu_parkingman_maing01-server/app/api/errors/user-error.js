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

  UserAlreadyCreated: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userAlreadyCreated`;
      this.message = "User already created.";
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

const List = {
  UC_CODE: `${USER_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  Create,
};
