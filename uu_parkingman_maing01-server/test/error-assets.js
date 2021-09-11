const DefaultDtoIn = require("./default-dto-in");

const ErrorAssets = {
  unsupportedKeys(cmd) {
    return {
      code: `${cmd}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: [Object.keys(DefaultDtoIn.unsupportedKeys)],
    };
  },

  invalidDtoIn(cmd) {
    return { code: `${cmd}/invalidDtoIn`, message: "DtoIn is not valid." };
  },

  userAlreadyCreated(cmd) {
    return { code: `${cmd}/userAlreadyCreated`, message: "User already created." };
  },

  parkingPlaceAlreadyCreated(cmd) {
    return { code: `${cmd}/parkingPlaceAlreadyCreated`, message: "Parking place already created." };
  },

  userDoesNotExist(cmd) {
    return { code: `${cmd}/userDoesNotExist`, message: "User does not exist." };
  },

  parkingPlaceDoesNotExist(cmd) {
    return { code: `${cmd}/parkingPlaceDoesNotExist`, message: "Parking place does not exist." };
  },

  dateCouldNotBeInPast(cmd) {
    return { code: `${cmd}/dateCouldNotBeInPast`, message: "Date could not be in past." };
  },

  dateToCouldNotBeLessThenDayFrom(cmd) {
    return { code: `${cmd}/dateToCouldNotBeLessThenDayFrom`, message: "DayTo could not be less then dayFrom." };
  },

  reservationLimitExceeded(cmd) {
    return {
      code: `${cmd}/reservationLimitExceeded`,
      message: "Maximum number of days of reservation has been exceeded.",
    };
  },

  parkingPlaceAlreadyReserved(cmd) {
    return { code: `${cmd}/parkingPlaceAlreadyReserved`, message: "Parking place already reserved." };
  },

  dayToParameterIsRequired(cmd) {
    return {
      code: `${cmd}/dayToParameterIsRequired`,
      message: "DayTo parameter is required if there is dayFrom in dtoIn.",
    };
  },

  dayFromParameterIsRequired(cmd) {
    return {
      code: `${cmd}/dayFromParameterIsRequired`,
      message: "DayFrom parameter is required if there is dayTo in dtoIn.",
    };
  },

  reservationDoesNotExist(cmd) {
    return {
      code: `${cmd}/reservationDoesNotExist`,
      message: "Reservation does not exist.",
    };
  },

  reservationBelongsToDifferentUser(cmd) {
    return {
      code: `${cmd}/reservationBelongsToDifferentUser`,
      message: "Only Auhtorities may update reservations of other users.",
    };
  },
};

module.exports = ErrorAssets;
