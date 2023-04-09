const { userDB } = require("../database/databases");
const ResourceNotFoundError = require("../errorHandlers/resourceNotFoundError");
const DuplicateError = require("../errorHandlers/duplicateError");
const UserModel = require("../models/userModel");

exports.checkIdNotDuplicated = async function checkIdNotDuplicated(
  request,
  response
) {
  const id = request.body.id;
  if (await UserModel.exists(userDB, id)) {
    throw new DuplicateError(`the user id ${id} is duplicated`);
  }
};

exports.checkParentExists = async function checkParentExists(
  request,
  response
) {
  const parent = request.body.parent;
  if (!(await UserModel.exists(userDB, parent))) {
    throw new ResourceNotFoundError(`the parent ${parent} is not found`);
  }
};

exports.checkIdExists = async function checkIdExists(request, response) {
  const id = request.body.id;
  if (!(await UserModel.exists(userDB, id)))
    throw new ResourceNotFoundError(`User with id ${id} not found`);
};
