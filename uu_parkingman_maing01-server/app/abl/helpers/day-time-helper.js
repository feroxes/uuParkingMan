const moment = require("moment");
const Constants = require("../constants.js");

const DayTimeHelper = {
  now() {
    return moment();
  },

  isDateInPast(date) {
    const dateFrom = this.now();
    const dateTo = moment(date);
    return this.getDateRage(dateFrom, dateTo) < 0;
  },

  isBetween(dayToCheck, dayFrom, dayTo, inclusivity = "[]") {
    return moment(dayToCheck).isBetween(dayFrom, dayTo, undefined, inclusivity);
  },

  getDateRage(dayFrom, dayTo) {
    const a = moment(dayFrom);
    const b = moment(dayTo);
    return b.diff(a, "days");
  },

  checkMaxReservationRange(dayFrom, dayTo) {
    const reservationRange = this.getDateRage(dayFrom, dayTo);
    return reservationRange > Constants.Reservation.MAX_RESERVATION_DAYS;
  },
};

module.exports = DayTimeHelper;
