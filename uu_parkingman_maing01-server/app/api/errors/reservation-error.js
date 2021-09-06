"use strict";

const ParkingmanMainUseCaseError = require("./parkingman-main-use-case-error.js");
const RESERVATION_ERROR_PREFIX = `${ParkingmanMainUseCaseError.ERROR_PREFIX}reservation/`;

const Create = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  ParkingPlaceDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceDoesNotExist`;
      this.message = "Parking place does not exist.";
    }
  },

  DateCouldNotBeInPast: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dateCouldNotBeInPast`;
      this.message = "Date could not be in past.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DayTo could not be less then dayFrom.";
    }
  },

  ReservationLimitExceeded: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationLimitExceeded`;
      this.message = "Maximum number of days of reservation has been exceeded.";
    }
  },

  ParkingPlaceAlreadyReserved: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceAlreadyReserved`;
      this.message = "Parking place already reserved.";
    }
  },

  ReservationCreateFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationCreateFailed`;
      this.message = "Failed to create reservation.";
    }
  },
};

const ListByCriteria = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}listByCriteria/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DayTo could not be less then dayFrom.";
    }
  },

  DayToParameterIsRequired: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dayToParameterIsRequired`;
      this.message = "DayTo parameter is required if there is dayFrom in dtoIn.";
    }
  },

  DayFromParameterIsRequired: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dayFromParameterIsRequired`;
      this.message = "DayFrom parameter is required if there is dayTo in dtoIn.";
    }
  },
};

module.exports = {
  ListByCriteria,
  Create,
};
