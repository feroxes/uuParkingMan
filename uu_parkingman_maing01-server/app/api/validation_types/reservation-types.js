/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});

//fixme because we work with reservation entity, it is enough to call prop "id", but not reservationId
const reservationUpdateDtoInType = shape({
  reservationId: id().isRequired(),
  userId: id(),
  parkingPlaceId: id(),
  //fixme dayFrom and  dayTo should be required. Otherwise, HDS 6,7,8, will fail if its not set
  dayFrom: date(),
  dayTo: date(),
  revision: integer().isRequired(),
});
