const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class DuplicateError extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.CONFLICT,
    description = "Conflict",
    isOperational = true
  ) {
    super(message, statusCode, description, isOperational);
  }
}

module.exports = DuplicateError;
