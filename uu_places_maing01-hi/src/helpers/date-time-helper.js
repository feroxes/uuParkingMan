import moment from "moment";

const DATE_FORMAT = "DD-MM-YYYY";

const DateTimeHelper = {
  now() {
    return moment();
  },

  getDate(date) {
    return moment(date);
  },

  getDateFormat() {
    return DATE_FORMAT;
  },

  formatDate(date, format = DATE_FORMAT) {
    return this.getDate(date).format(format);
  },

  getDateRage(dayFrom, dayTo) {
    const a = moment(dayFrom);
    const b = moment(dayTo);
    return b.diff(a, "days");
  },

  isDateInPast(date) {
    const dateFrom = this.now();
    const dateTo = moment(date);
    return this.getDateRage(dateFrom, dateTo) < 0;
  },

  getDiffDays(date1, date2) {
    const a = this.getDate(date1);
    const b = this.getDate(date2);
    return b.diff(a, "days") + 1;
  },

  isBetween(dayToCheck, dayFrom, dayTo) {
    const x = this.getDate(dayToCheck);
    const a = this.getDate(dayFrom);
    const b = this.getDate(dayTo);
    return x.isBetween(a, b) || x.isSame(a, "day") || x.isSame(b, "day");
  },

  getWeek(date) {
    const currentDate = this.getDate(date);
    const start = currentDate.startOf("isoWeek").format();
    const end = currentDate.endOf("isoWeek").format();
    return { start, end };
  },

  getWeekDays() {
    return moment.weekdaysShort();
  },

  getRange(startDate, endDate, type = "days") {
    const fromDate = moment(startDate);
    const toDate = moment(endDate);
    const diff = toDate.diff(fromDate, type);
    const range = [];
    for (let i = 0; i <= diff; i++) {
      range.push(moment(startDate).add(i, type).format());
    }
    return range;
  },

  isReservationOpenedBySelectedDay(reservationsConfig, selectedDay) {
    const now = moment();
    const openReservationTimePeriod = moment()
      .startOf("isoWeek")
      .add(reservationsConfig.dayOfStartReservations - 1, "days")
      .add(reservationsConfig.hourOfStartReservations, "hours");
    const a = moment(selectedDay);

    const startOfNextWeek = moment().add(1, "week").startOf("isoWeek");
    const endOfNextWeek = moment().add(1, "week").endOf("isoWeek");

    if (a.isSameOrAfter(startOfNextWeek)) {
      if (a.isAfter(endOfNextWeek)) return false;
      else return now.isSameOrAfter(openReservationTimePeriod);
    } else return true;
  },

  isReservationOpened(reservationsConfig) {
    const now = moment();
    const openReservationTimePeriod = moment()
      .startOf("isoWeek")
      .add(reservationsConfig.dayOfStartReservations - 1, "days")
      .add(reservationsConfig.hourOfStartReservations, "hours");
    return now.isAfter(openReservationTimePeriod);
  },

  getDayName(day) {
    const date = moment().startOf("isoWeek").add(day, "days");
    return date.format("dddd");
  },

  getEndOnNextWeek(format) {
    const date = moment().endOf("isoWeek").add(1, "week");
    return date.format(format);
  },

  getEndOnCurrentWeek(format) {
    const date = moment().endOf("isoWeek");
    return date.format(format);
  },
};

export default DateTimeHelper;
