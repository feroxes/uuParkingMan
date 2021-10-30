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
    return b.diff(a, "days");
  },

  isBetween(dayToCheck, dayFrom, dayTo) {
    const x = this.getDate(dayToCheck);
    const a = this.getDate(dayFrom);
    const b = this.getDate(dayTo);
    return x.isBetween(a, b) || x.isSame(a) || x.isSame(b);
  },
};

export default DateTimeHelper;
