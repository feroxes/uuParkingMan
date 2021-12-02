"use strict";
const ValidateHelper = require("../validate-helper");

const ValidateReservation = {
  validateObject(response, dtoIn) {
    expect(response.userId).toBeDefined();
    expect(response.parkingPlaceId).toBeDefined();
    expect(response.dayFrom).toBeDefined();
    expect(response.dayTo).toBeDefined();

    if (dtoIn) {
      dtoIn.userId && expect(response.userId).toEqual(dtoIn.userId);
      dtoIn.parkingPlaceId && expect(response.parkingPlaceId).toEqual(dtoIn.parkingPlaceId);
      dtoIn.dayFrom && expect(response.dayFrom).toEqual(dtoIn.dayFrom);
      dtoIn.dayTo && expect(response.dayTo).toEqual(dtoIn.dayTo);
    }
  },
  validateListObject(response) {
    ValidateHelper.validateBaseListResult(response, 1, 0, 1000);
    response.itemList.forEach((item) => {
      ValidateHelper.validateBaseObjectData(item);
    });
  },
};

module.exports = ValidateReservation;
