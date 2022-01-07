"use strict";
const PlacesMainUseCaseError = require("./places-main-use-case-error.js");
const USER_ERROR_PREFIX = `${PlacesMainUseCaseError.ERROR_PREFIX}user/`;

const Create = {
  UC_CODE: `${USER_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserAlreadyCreated: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userAlreadyCreated`;
      this.message = "User already created.";
    }
  },

  UserCreateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userCreateFailed`;
      this.message = "Failed to create user.";
    }
  },
};

const List = {
  UC_CODE: `${USER_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Update = {
  UC_CODE: `${USER_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  UserDaoUpdateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDaoUpdateFailed`;
      this.message = "User DAO update failed.";
    }
  },
};

const GetUserProfile = {
  UC_CODE: `${USER_ERROR_PREFIX}getUserProfile/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetUserProfile.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetUserProfile.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  UserDoesNotAuthorized: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetUserProfile.UC_CODE}userDoesNotAuthorized`;
      this.message = "User does not authorized.";
    }
  },

};

module.exports = {
  GetUserProfile,
  Update,
  List,
  Create,
};
