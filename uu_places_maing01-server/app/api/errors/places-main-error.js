"use strict";
const PlacesMainUseCaseError = require("./places-main-use-case-error.js");

const Init = {
  UC_CODE: `${PlacesMainUseCaseError.ERROR_PREFIX}init/`,

  PlacesAlreadyInitialized: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}placesAlreadyInitialized`;
      this.message = "Places already initialized.";
    }
  },

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  PlacesCreateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}placesCreateFailed`;
      this.message = "Places create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${PlacesMainUseCaseError.ERROR_PREFIX}places/update/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PlacesDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}placesDoesNotExist`;
      this.message = "Places does not exist.";
    }
  },

  PlacesDaoUpdateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}placesDaoUpdateFailed`;
      this.message = "Places DAO update failed.";
    }
  },
};

module.exports = {
  Init,
  Update,
};
