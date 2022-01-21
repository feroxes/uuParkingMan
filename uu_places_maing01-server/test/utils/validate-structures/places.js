"use strict";
const ValidateParkingPlace = {
  validateObject(response, dtoIn) {
    expect(response.name).toBeDefined();
    expect(response.reservationsConfig).toBeDefined();
    expect(response.reservationsConfig.dayOfStartReservations).toBeDefined();
    expect(response.reservationsConfig.hourOfStartReservations).toBeDefined();
    if (dtoIn) {
      dtoIn.name && expect(response.name).toEqual(dtoIn.name);
      if (dtoIn.reservationsConfig) {
        expect(response.reservationsConfig.dayOfStartReservations).toEqual(
          dtoIn.reservationsConfig.dayOfStartReservations
        );
        expect(response.reservationsConfig.hourOfStartReservations).toEqual(
          dtoIn.reservationsConfig.hourOfStartReservations
        );
      }
    }
  },
};

module.exports = ValidateParkingPlace;
