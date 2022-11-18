const Constants = {
  mainColor: "rgb(33, 150, 243)",
  space: `\u00A0`,
  spinner: "https://c.radikal.ru/c23/2109/23/5ee314a917b6.gif",

  profiles: {
    AUTHORITIES: "Authorities",
  },

  Users: {
    columnKeys: {
      uuIdentity: "uuIdentity",
    },
    formNames: {
      uuIdentity: "uuIdentity",
      type: "type",
      model: "model",
      brand: "brand",
      number: "number",
    },
  },

  ParkingPlace: {
    underground: "underground",
    surface: "surface",

    columnKeys: {
      type: "type",
    },
    types: [
      { value: "underground", content: "Underground" },
      { value: "surface", content: "Surface" },
    ],
    formNames: {
      type: "type",
      ownerUuIdentity: "ownerUuIdentity",
      number: "number",
    },
  },

  Reservation: {
    formNames: {
      userId: "userId",
      parkingPlaceId: "parkingPlaceId",
      daysRange: "daysRange",
      sendMessage: "sendMessage",
    },
  },

  Settings: {
    formNames: {
      dayOfStartReservations: "dayOfStartReservations",
      hourOfStartReservations: "hourOfStartReservations",
      message: "message",
    },
  },
};

export default Constants;
