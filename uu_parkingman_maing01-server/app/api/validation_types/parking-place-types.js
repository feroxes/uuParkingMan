/* eslint-disable */
const parkingPlaceCreateDtoInType = shape({
  number: number(1, null).isRequired(),
  type: oneOf(["underground", "surface"]).isRequired()
});

const parkingPlaceListDtoInType = shape({});

const parkingPlaceUpdateDtoInType = shape({
  id: id().isRequired(),
  number: number(1, null),
  type: oneOf(["underground", "surface"])
});
