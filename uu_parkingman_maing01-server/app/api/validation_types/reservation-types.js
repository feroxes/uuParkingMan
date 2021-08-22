/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});

const reservationUpdateDtoInType = shape({
  reservationId: id().isRequired(),
  userId: id(),
  parkingPlaceId: id(),
  dayFrom: date(),
  dayTo: date(),
  revision: integer().isRequired(),
});
