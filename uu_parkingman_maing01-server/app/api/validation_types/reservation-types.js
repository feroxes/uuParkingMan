/* eslint-disable */
const reservationCreateDtoInType = shape({
  userId: id().isRequired(),
  parkingPlaceId: id().isRequired(),
  dayFrom: date().isRequired(),
  dayTo: date().isRequired(),
});


const reservationDeleteDtoInType = shape({
  id: id().isRequired()
});

const reservationUpdateDtoInType = shape({
  id: id().isRequired(),
  userId: id(),
  parkingPlaceId: id(),
  dayFrom: date(),
  dayTo: date(),
  revision: integer().isRequired(),
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
