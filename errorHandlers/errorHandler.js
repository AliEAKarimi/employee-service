const BaseError = require("./baseError");

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  isOperationalError,
};
