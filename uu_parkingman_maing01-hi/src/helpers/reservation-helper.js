import DateTimeHelper from "./date-time-helper.js";

const ReservationHelper = {
  findReservation(parkingPlaceId, reservations, date) {
    const reservationByParkingPlace = reservations.filter(
      (reservation) => reservation.data.parkingPlaceId === parkingPlaceId
    );
    return reservationByParkingPlace.find((reservation) =>
      DateTimeHelper.isBetween(date, reservation.data.dayFrom, reservation.data.dayTo)
    );
  },

  isParkingPlaceReserved(parkingPlaceId, reservations, date) {
    return !!this.findReservation(parkingPlaceId, reservations, date);
  },
};

export default ReservationHelper;
