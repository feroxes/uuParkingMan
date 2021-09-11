const Errors = require("../../api/errors/reservation-error.js");

const Warnings = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  listByCriteriaUnsupportedKeys: {
    code: `${Errors.ListByCriteria.UC_CODE}unsupportedKeys`,
  },

  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
};

module.exports = Warnings;
