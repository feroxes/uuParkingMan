"use strict";
const ParkingmanMainUseCaseError = require("./parkingman-main-use-case-error.js");

const Init = {
  UC_CODE: `${ParkingmanMainUseCaseError.ERROR_PREFIX}init/`,

  ParkingManAlreadyInitialized: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}parkingManAlreadyInitialized`;
      this.message = "ParkingMan already initialized.";
    }
  },

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

module.exports = {
  Init,
};
