/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});

const reservationListByCriteriaDtoInType = shape({
  dayFrom: date(),
  dayTo: date(),
  filterMap: shape({
    userId: id(),
    parkingPlaceId: id()
  }),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
