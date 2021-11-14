const Constants = {
  Schemas: {
    PARKINGMAN: "parkingmanMain",
    USER: "user",
    PARKING_PLACE: "parkingPlace",
    RESERVATION: "reservation",
  },

  States: {
    ACTIVE: "active",
  },

  Profiles: {
    AUTHORITIES: "Authorities",
  },

  User: {
    Transport: {
      Types: {
        CAR: "car",
      },
    },
  },

  Reservation: {
    MAX_RESERVATION_DAYS: 5,
  },
  DEFAULT_PAGE_INDEX: 0,
  DEFAULT_PAGE_SIZE: 1000,
};

module.exports = Constants;
