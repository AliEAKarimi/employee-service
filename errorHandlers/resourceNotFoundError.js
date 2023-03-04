const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class ResourceNotFoundError extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = "Not Found",
    isOperational = true
  ) {
    super(message, statusCode, description, isOperational);
  }
}

module.exports = ResourceNotFoundError;
