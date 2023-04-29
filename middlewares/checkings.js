const UserModel = require("../models/userModel");
const ResourceNotFoundError = require("../errorHandlers/resourceNotFoundError");
const DuplicateError = require("../errorHandlers/duplicateError");

exports.checkIdNotDuplicated = async function checkIdNotDuplicated(
  request,
  response
) {
  const id = request.body.id;
  if (await UserModel.exists(`user:${id}`)) {
    throw new DuplicateError(`the user id ${id} is duplicated`);
  }
};

exports.checkParentExists = async function checkParentExists(
  request,
  response
) {
  const parent = request.body.parent;
  if (parent && !(await UserModel.exists(`user:${parent}`))) {
    throw new ResourceNotFoundError(`the parent ${parent} is not found`);
  }
};

exports.checkIdExists = async function checkIdExists(request, response) {
  const id = request.body.id;
  if (!(await UserModel.exists(`user:${id}`)))
    throw new ResourceNotFoundError(`User with id ${id} not found`);
};

exports.checkUsernameExists = async function checkUsernameExists(request, response) {
  const username = request.body.username;
  if (!(await UserModel.usernameExists(username)))
    throw new ResourceNotFoundError(`User with username ${username} not found`);
};

exports.checkUsernameNotDuplicated = async function (request, response) {
  const username = request.body.data.username;
  if (await UserModel.usernameExists(username))
    throw new DuplicateError(`the username ${username} is duplicated`);
};
