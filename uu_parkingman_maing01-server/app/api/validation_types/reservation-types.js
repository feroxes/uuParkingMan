/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});

const reservationListByCriteriaDtoInType = shape({
  filterMap: shape({
    userId: id(),
    parkingPlaceId: id(),
    dayFrom: date(),
    dayTo: date(),
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
