const BadRequestError = require("../errorHandlers/badRequestError");
function validateRequestData(data, schema) {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    throw new BadRequestError(`Invalid request data: ${errors.join(", ")}`);
  }
  return value;
}

module.exports = {
  validateRequestData,
};
