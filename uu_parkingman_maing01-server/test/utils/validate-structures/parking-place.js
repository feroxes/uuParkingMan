"use strict";
const ValidateHelper = require("../validate-helper");

const ValidateParkingPlace = {
  validateObject(response, dtoIn) {
    expect(response.number).toBeDefined();
    expect(response.type).toBeDefined();
    if (dtoIn) {
      dtoIn.number && expect(response.number).toEqual(dtoIn.number);
      dtoIn.type && expect(response.type).toEqual(dtoIn.type);
    }
  },
  validateListObject(response) {
    ValidateHelper.validateBaseListResult(response, 1, 0, 1000);
    response.itemList.forEach((item) => {
      ValidateHelper.validateBaseObjectData(item);
    });
  },
};

module.exports = ValidateParkingPlace;
