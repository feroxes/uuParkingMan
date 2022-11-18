const NotifyHelper = {
  getEmptyPlaceMessage(placeNumber, timeSlot, uri) {
    const baseUri = uri.getBaseUri().toString();
    return `<a href=${baseUri}>Parking place #${placeNumber}</a> is available for booking. Time slot: ${timeSlot}`;
  },
};

module.exports = NotifyHelper;
