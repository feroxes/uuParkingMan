"use strict";
const ValidateHelper = require("../validate-helper");

const ValidateUser = {
  validateObject(response, dtoIn) {
    expect(response.uuIdentity).toBeDefined();
    expect(response.id).toBeDefined();
    expect(response.transport).toBeDefined();
    expect(response.transport.type).toBeDefined();
    expect(response.transport.brand).toBeDefined();
    expect(response.transport.model).toBeDefined();
    expect(response.transport.number).toBeDefined();

    if (dtoIn) {
      dtoIn.uuIdentity && expect(response.uuIdentity).toEqual(dtoIn.uuIdentity);
      dtoIn.transport.type && expect(response.transport.type).toEqual(dtoIn.transport.type);
      dtoIn.transport.brand && expect(response.transport.brand).toEqual(dtoIn.transport.brand);
      dtoIn.transport.model && expect(response.transport.model).toEqual(dtoIn.transport.model);
      dtoIn.transport.number && expect(response.transport.number).toEqual(dtoIn.transport.number);
    }
  },
  validateListObject(response) {
    ValidateHelper.validateBaseListResult(response, 1, 0, 1000);
    response.itemList.forEach((item) => {
      ValidateHelper.validateBaseObjectData(item);
    });
  },
};

module.exports = ValidateUser;
