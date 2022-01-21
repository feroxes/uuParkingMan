"use strict";

const PlacesMainUseCaseError = require("./places-main-use-case-error.js");
const RESERVATION_ERROR_PREFIX = `${PlacesMainUseCaseError.ERROR_PREFIX}reservation/`;

const Create = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UserDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  ParkingPlaceDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceDoesNotExist`;
      this.message = "Parking place does not exist.";
    }
  },

  DateCouldNotBeInPast: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dateCouldNotBeInPast`;
      this.message = "Date could not be in the past.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DayTo could not be less then dayFrom.";
    }
  },

  ReservationLimitExceeded: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationLimitExceeded`;
      this.message = "Maximum number of days of reservation has been exceeded.";
    }
  },

  ReservationClosed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationClosed`;
      this.message = "Parking places closed for reservation.";
    }
  },

  ParkingPlaceAlreadyReserved: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}parkingPlaceAlreadyReserved`;
      this.message = "Parking place already reserved.";
    }
  },

  ReservationCreateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}reservationCreateFailed`;
      this.message = "Failed to create reservation.";
    }
  },
};

const Update = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReservationDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationDoesNotExist`;
      this.message = "Reservation does not exist.";
    }
  },

  ReservationRevisionDoesNotMatch: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationRevisionDoesNotMatch`;
      this.message = "Reservation revision number does not match the value in the existing reservation.";
    }
  },

  ReservationBelongsToDifferentUser: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationBelongsToDifferentUser`;
      this.message = "Only Authorities may update reservations of other users.";
    }
  },

  NotAllowedToChangeUser: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}notAllowedToChangeUser`;
      this.message = "Only Authorities may change users.";
    }
  },

  UserDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userDoesNotExist`;
      this.message = "User does not exist.";
    }
  },

  ParkingPlaceDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceDoesNotExist`;
      this.message = "Parking place does not exist.";
    }
  },

  DateCouldNotBeInPast: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}dateCouldNotBeInPast`;
      this.message = "Date could not be in the past.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DayTo could not be less then dayFrom.";
    }
  },

  ReservationLimitExceeded: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationLimitExceeded`;
      this.message = "Maximum number of days of reservation has been exceeded.";
    }
  },

  ParkingPlaceAlreadyReserved: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}parkingPlaceAlreadyReserved`;
      this.message = "Parking place already reserved.";
    }
  },

  ReservationUpdateFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}reservationUpdateFailed`;
      this.message = "Failed to update reservation.";
    }
  },
};

const ListByCriteria = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}listByCriteria/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  DateToCouldNotBeLessThenDayFrom: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dateToCouldNotBeLessThenDayFrom`;
      this.message = "DayTo could not be less then dayFrom.";
    }
  },

  DayToParameterIsRequired: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dayToParameterIsRequired`;
      this.message = "DayTo parameter is required if there is dayFrom in dtoIn.";
    }
  },

  DayFromParameterIsRequired: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${ListByCriteria.UC_CODE}dayFromParameterIsRequired`;
      this.message = "DayFrom parameter is required if there is dayTo in dtoIn.";
    }
  },
};

const Delete = {
  UC_CODE: `${RESERVATION_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ReservationDoesNotExist: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}reservationDoesNotExist`;
      this.message = "Reservation does not exist.";
    }
  },

  ReservationDeleteFailed: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}reservationDeleteFailed`;
      this.message = "Failed to delete reservation.";
    }
  },

  ReservationBelongsToDifferentUser: class extends PlacesMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}reservationBelongsToDifferentUser`;
      this.message = "Only Authorities may update reservations of other users.";
    }
  },
};

module.exports = {
  Delete,
  Create,
  Update,
  ListByCriteria,
};
