/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});
