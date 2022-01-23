const NotifyHelper = {
  getEmptyPlaceMessage(placeNumber, timeSlot) {
    return `<a href="https://uuapp.plus4u.net/uu-places-maing01/71730b0ed99a4716ba69b654422b626c/">Parking place #${placeNumber}</a> is available for booking. Time slot: ${timeSlot}`;
  },
};

module.exports = NotifyHelper;
