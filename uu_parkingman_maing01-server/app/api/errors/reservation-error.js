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
      this.message = "Date could not be in the past.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DateTo could not be less then dateFrom.";
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

const Update = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReservationDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationDoesNotExist`;
      this.message = "Reservation does not exist.";
    }
  },

  UserDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  ParkingPlaceDoesNotExist: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceDoesNotExist`;
      this.message = "Parking place does not exist.";
    }
  },

  DateCouldNotBeInPast: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}dateCouldNotBeInPast`;
      this.message = "Date could not be in the past.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DateTo could not be less then dateFrom.";
    }
  },

  ReservationLimitExceeded: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationLimitExceeded`;
      this.message = "Maximum number of days of reservation has been exceeded.";
    }
  },

  ParkingPlaceAlreadyReserved: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceAlreadyReserved`;
      this.message = "Parking place already reserved.";
    }
  },

  ReservationUpdateFailed: class extends ParkingmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationUpdateFailed`;
      this.message = "Failed to update reservation.";
    }
  },
};

module.exports = {
  Create,
  Update,
};
