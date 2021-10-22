const Lsi = {
  user: { en: "User" },
  parkingPlace: { en: "Parking Place" },
  reservationDates: { en: "Reservation Dates" },
  reservationDuration: { en: "Reservation Duration" },
  days: (days) => {
    return { en: `${days} days` };
  },

  update: { en: "Update" },
  createReservation: { en: "Create Reservation" },
  reservationUpdate: { en: "Reservation Update" },
  successMessage: (prop) => {
    return { en: `Reservation successfully ${prop}` };
  },
};

export default Lsi;
