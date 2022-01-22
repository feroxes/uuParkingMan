const Lsi = {
  user: { en: "User" },
  parkingPlace: { en: "Parking Place" },
  reservationDates: { en: "Reservation Dates" },
  reservationDuration: { en: "Reservation Duration" },
  days: (days) => {
    return { en: `${days} days` };
  },

  update: { en: "Update" },
  delete: { en: "Delete" },
  createReservation: { en: "Create Reservation" },
  reservationUpdate: { en: "Reservation Update" },
  reservationDelete: { en: "Reservation Delete" },
  reservationDeleteConfirmation: { en: "Are you sure you want to delete this reservation?" },
  successMessage: (prop) => {
    return { en: `Reservation successfully ${prop}` };
  },
  reservations: { en: "Reservations" },
  weeklyOverview: { en: "Weekly Overview" },
  yourParkingPlace: { en: "Your parking place:" },
  noReservation: { en: "Today you haven't reservations." },
  notOpened: { en: "Reservation will be opened on" },
};

export default Lsi;
