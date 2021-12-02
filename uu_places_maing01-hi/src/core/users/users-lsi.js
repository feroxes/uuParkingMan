const Lsi = {
  user: { en: "User" },
  transport: { en: "Transport" },
  transportNumber: { en: "Transport Number" },
  transportType: { en: "Transport Type" },
  createUser: { en: "Create new user" },
  userUpdate: { en: "Update user" },
  update: { en: "Update" },
  userInfo: { en: "User info" },
  transportInfo: { en: "Transport info" },
  uuIdentity: { en: "uuIdentity" },
  type: { en: "Type" },
  model: { en: "Model" },
  brand: { en: "Brand" },
  number: { en: "Number" },
  userCreatePlaceHolders: {
    uuIdentity: { en: "8517-626-1" },
    model: { en: "BMW" },
    brand: { en: "i3" },
    number: { en: "AA1111OO" },
  },
  successMessage: (prop) => {
    return { en: `User successfully ${prop}` };
  },
};

export default Lsi;
