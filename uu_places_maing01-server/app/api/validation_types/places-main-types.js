/* eslint-disable */
const initDtoInType = shape({
  name: uu5String(512).isRequired(),
  reservationsConfig: shape({
    dayOfStartReservations: number(1, 7).isRequired(),
    hourOfStartReservations: number(1, 24).isRequired(),
  }).isRequired(),
});

const placesLoadDtoInType = shape({
  name: uu5String(512),
  reservationsConfig: shape({
    dayOfStartReservations: number(1, 7).isRequired(),
    hourOfStartReservations: number(1, 24).isRequired(),
  }),
});
