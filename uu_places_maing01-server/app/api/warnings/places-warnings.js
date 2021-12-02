const Errors = require("../errors/places-main-error.js");

const Warnings = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
