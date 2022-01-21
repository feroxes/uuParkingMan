"use strict";

const DefaultDtoIn = {
  uuPlaces: {
    Init: {
      name: "uuPlaces",
      reservationsConfig: {
        dayOfStartReservations: 1,
        hourOfStartReservations: 10,
      },
    },
    Update: {
      name: "uuPlaces updated",
      reservationsConfig: {
        dayOfStartReservations: 5,
        hourOfStartReservations: 15,
      },
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
    Update: {
      transport: {
        brand: "Lada",
        model: "Priora",
        number: "TLEN",
      },
    },
  },

  ParkingPlace: {
    Create: {
      number: 1,
      type: "underground",
    },
    Update: {
      number: 2,
      type: "surface",
    },
  },

  unsupportedKeys: {
    extraAttribute: "",
  },
};

module.exports = DefaultDtoIn;
