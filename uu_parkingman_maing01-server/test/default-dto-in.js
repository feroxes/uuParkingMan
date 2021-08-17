"use strict";

const DefaultDtoIn = {
  uuParkingMan: {
    Init: {
      name: "uuParkingMan",
    },
  },

  User: {
    Create: {
      uuIdentity: "8517-626-1",
      transport: {
        brand: "Kia",
        model: "Rio X",
        number: "AA9022EA",
      },
    },
  },

  unsupportedKeys: {
    extraAttribute: "",
  },
};

module.exports = DefaultDtoIn;
