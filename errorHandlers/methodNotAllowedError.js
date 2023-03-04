const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class MethodNotAllowedError extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.METHOD_NOT_ALLOWED,
    description = "Method Not Allowed",
    isOperational = true
  ) {
    super(message, statusCode, description, isOperational);
  }
}

module.exports = MethodNotAllowedError;
