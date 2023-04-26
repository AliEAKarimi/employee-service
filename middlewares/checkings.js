const { userDB } = require("../database/databases");
const ResourceNotFoundError = require("../errorHandlers/resourceNotFoundError");
const DuplicateError = require("../errorHandlers/duplicateError");

exports.checkIdNotDuplicated = async function checkIdNotDuplicated(
  request,
  response
) {
  const id = request.body.id;
  if (await userDB.exists(`user:${id}`)) {
    throw new DuplicateError(`the user id ${id} is duplicated`);
  }
};

exports.checkParentExists = async function checkParentExists(
  request,
  response
) {
  const parent = request.body.parent;
  if (parent && !(await userDB.exists(`user:${parent}`))) {
    throw new ResourceNotFoundError(`the parent ${parent} is not found`);
  }
};

exports.checkIdExists = async function checkIdExists(request, response) {
  const id = request.body.id;
  if (!(await userDB.exists(`user:${id}`)))
    throw new ResourceNotFoundError(`User with id ${id} not found`);
};
