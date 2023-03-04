const httpStatusCodes = require("./httpStatusCodes");
const BaseError = require("./baseError");

class DatabaseError extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    description = "Internal Server Error",
    isOperational = true
  ) {
    super(message, statusCode, description, isOperational);
  }
}

module.exports = DatabaseError;
