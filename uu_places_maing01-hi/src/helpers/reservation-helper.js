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

  isParkingPlaceReserved(parkingPlaceId, reservations, date, getReservation = false) {
    const reservation = this.findReservation(parkingPlaceId, reservations, date);
    if (getReservation) {
      return { isParkingPlaceReserved: !!reservation, reservation };
    } else return !!reservation;
  },

  getReservationUser(reservation, usersDataList) {
    return usersDataList.find((user) => user.data.id === reservation.data.userId);
  },

  isUserOwnerOfReservation(uuIdentity, session) {
    return uuIdentity === session.identity.uuIdentity;
  },

  getUser(usersDataList, session) {
    return usersDataList.data.find((user) => user.data.uuIdentity === session.identity.uuIdentity);
  },
};

export default ReservationHelper;
