const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class BadRequestError extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = "Bad Request",
    isOperational = true
  ) {
    super(message, statusCode, description, isOperational);
  }
}

module.exports = BadRequestError;
