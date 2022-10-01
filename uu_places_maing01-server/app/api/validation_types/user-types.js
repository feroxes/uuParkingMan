/* eslint-disable */
const userCreateDtoInType = shape({
  uuIdentity: uuIdentity().isRequired(),
  transport: shape({
    type: uu5String(20),
    brand: uu5String(20),
    model: uu5String(20),
    number: uu5String(10),
  }).isRequired()
});

const userListDtoInType = shape({});

const userUpdateDtoInType = shape({
  id: id().isRequired(),
  uuIdentity: uuIdentity(),
  transport: shape({
    type: uu5String(20),
    brand: uu5String(20).isRequired(),
    model: uu5String(20).isRequired(),
    number: uu5String(10).isRequired(),
  })
});

const getUserProfileDtoInType = shape({
  uuIdentity: uuIdentity().isRequired(),
});

const deleteUserProfileDtoInType = shape({
  id: id().isRequired(),
});
