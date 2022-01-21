const moment = require("moment");
const Constants = require("../constants.js");

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";

const DayTimeHelper = {
  now(format = DEFAULT_DATE_FORMAT) {
    return moment().format(format);
  },

  getDefaultDateFormat() {
    return DEFAULT_DATE_FORMAT;
  },

  isDateInPast(date) {
    const dateFrom = this.now();
    const dateTo = moment(date);
    return this.getDateRage(dateFrom, dateTo) < 0;
  },

  isBetween(dayToCheck, dayFrom, dayTo, inclusivity = "[]") {
    return moment(dayToCheck).isBetween(dayFrom, dayTo, undefined, inclusivity);
  },

  isRangeOverlapping(range1From, range1To, range2From, range2To) {
    return range1From <= range2To && range2From <= range1To;
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

  prepareFilterMapByDays(dayFrom, dayTo) {
    return {
      ...(dayFrom && { dayTo: dayFrom }),
      ...(dayTo && { dayFrom: dayTo }),
    };
  },

  isReservationOpened(reservationsConfig, dayFrom, dayTo) {
    const now = moment();
    const openReservationTimePeriod = moment()
      .startOf("isoWeek")
      .add(reservationsConfig.dayOfStartReservations - 1, "days")
      .add(14, "hours");

    const a = moment(dayFrom);
    const b = moment(dayTo);

    const startOfNextWeek = moment().add(1, "week").startOf("isoWeek");

    if (a.isSameOrAfter(startOfNextWeek) || b.isSameOrAfter(startOfNextWeek)) {
      return now.isSameOrAfter(openReservationTimePeriod);
    } else return true;
  },

  getDayName(day) {
    const date = moment().startOf("isoWeek").add(day, "days");
    return date.format("dddd");
  },
};

module.exports = DayTimeHelper;
