const Errors = require("../../api/errors/user-error.js");

const Warnings = {
  initUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
