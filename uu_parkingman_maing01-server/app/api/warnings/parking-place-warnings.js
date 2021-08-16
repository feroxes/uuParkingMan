const Errors = require("../../api/errors/parking-place-error.js");

const Warnings = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
