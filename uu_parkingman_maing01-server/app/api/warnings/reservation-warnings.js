const Errors = require("../../api/errors/reservation-error.js");

const Warnings = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },

  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
