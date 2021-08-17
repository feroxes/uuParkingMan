const DefaultDtoIn = require("./default-dto-in");

const ErrorAssets = {
  unsupportedKeys(cmd) {
    return {
      code: `${cmd}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: [Object.keys(DefaultDtoIn.unsupportedKeys)],
    };
  },

  invalidDtoIn(cmd) {
    return { code: `${cmd}/invalidDtoIn`, message: "DtoIn is not valid." };
  },

  userAlreadyCreated(cmd) {
    return { code: `${cmd}/userAlreadyCreated`, message: "User already created." };
  },

  parkingPlaceAlreadyCreated(cmd) {
    return { code: `${cmd}/parkingPlaceAlreadyCreated`, message: "Parking place already created." };
  },
};

module.exports = ErrorAssets;
