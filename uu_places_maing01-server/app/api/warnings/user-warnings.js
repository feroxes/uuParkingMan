const Errors = require("../../api/errors/user-error.js");

const Warnings = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  getUserProfileUnsupportedKeys: {
    code: `${Errors.GetUserProfile.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
