const BadRequestError = require("../errorHandlers/badRequestError");
module.exports = async function dataValidator(request, response, { schema }) {
  const { error: err } = schema.validate(request.body, {
    abortEarly: false,
  });
  if (err) {
    const errors = err.details.map((detail) =>
      detail.message.replaceAll('"', "'")
    );
    throw new BadRequestError(`Invalid request data: ${errors.join(", ")}`);
  }
};
