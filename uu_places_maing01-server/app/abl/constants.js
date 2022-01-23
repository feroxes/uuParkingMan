const Constants = {
  Schemas: {
    PLACES: "placesMain",
    USER: "user",
    PARKING_PLACE: "parkingPlace",
    RESERVATION: "reservation",
  },

  States: {
    ACTIVE: "active",
  },

  Profiles: {
    AUTHORITIES: "Authorities",
    USERS: "Users",
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

  Telegram: {
    botToken: "5206449543:AAE9tRHvPQc4Wy2d2K9sLVDvhJ8eU70x9Ks",
    chanelChatId: "-1001734387580",
  },

  DEFAULT_PAGE_INDEX: 0,
  DEFAULT_PAGE_SIZE: 1000,
};

module.exports = Constants;
