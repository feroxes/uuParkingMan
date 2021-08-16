/* eslint-disable */
const parkingPlaceCreateDtoInType = shape({
  number: number(1, null).isRequired(),
  type: oneOf(["underground", "surface"]).isRequired()
});
