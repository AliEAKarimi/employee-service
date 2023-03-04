const url = require("url");
const { userDB, parentDB } = require("../database/databases");
const { userSchema, getUserQuerySchema } = require("../schemas/schemas");
const DuplicateError = require("../errorHandlers/duplicateError");
const ResourceNotFoundError = require("../errorHandlers/resourceNotFoundError");
const { validateRequestData } = require("../helpers/validationHelpers");
const { parseRequestBody, sendResponse } = require("../helpers/requestHelpers");
const httpStatusCodes = require("../errorHandlers/httpStatusCodes");
const BaseError = require("../errorHandlers/baseError");
const DatabaseError = require("../errorHandlers/databaseError");

async function isDataExists(data) {
  let isDataExists = false;
  try {
    isDataExists = await userDB.exists(data);
  } catch (error) {
    throw new DatabaseError("Error in check existing data");
  }
  return isDataExists;
}

async function addUser(request, response) {
  try {
    let body = await parseRequestBody(request);
    const { id, data, parent } = validateRequestData(
      JSON.parse(body),
      userSchema
    );
    if (await isDataExists(id)) {
      throw new DuplicateError(`the user id ${id} is duplicated`);
    }

    if (!(await isDataExists(parent))) {
      throw new ResourceNotFoundError(`the parent ${parent} is not found`);
    }

    try {
      // Save data and parent to Redis
      await userDB.add(id, JSON.stringify(data));
      await parentDB.add(id, parent);
      sendResponse(response, httpStatusCodes.OK, { message: "Data added." });
    } catch (error) {
      throw new DatabaseError("Error in adding data");
    }
  } catch (error) {
    sendResponse(response, error.statusCode, { message: error.message });
  }
}

async function updateUser(request, response) {
  try {
    let body = await parseRequestBody(request);
    const { id, data, parent } = validateRequestData(
      JSON.parse(body),
      userSchema
    );

    if (!(await isDataExists(id)))
      throw new ResourceNotFoundError(`User with id ${id} not found`);

    if (!(await isDataExists(parent))) {
      throw new ResourceNotFoundError(`the parent ${parent} is not found`);
    }

    try {
      // Update data and parent in Redis
      await userDB.update(id, JSON.stringify(data));
      await parentDB.update(id, parent);
      sendResponse(response, httpStatusCodes.OK, { message: "Data updated." });
    } catch (error) {
      throw new DatabaseError("Error in updating data");
    }
  } catch (error) {
    if (error instanceof BaseError)
      sendResponse(response, error.statusCode, { message: error.message });
  }
}
async function getUser(request, response) {
  try {
    const { id } = validateRequestData(
      url.parse(request.url, true).query,
      getUserQuerySchema
    );
  
    if (!(await isDataExists(id))) {
      throw new ResourceNotFoundError(`User with id ${id} not found`);
    }

    try {
      // Get data and parent from Redis
      const [data, parent] = await Promise.all([
        userDB.get(id),
        parentDB.get(id),
      ]);
      const result = { id, data, parent };
      sendResponse(response, httpStatusCodes.OK, result);
    } catch (error) {
      throw new DatabaseError("Error in getting data");
    }
  } catch (error) {
    sendResponse(response, error.statusCode, { message: error.message });
  }
}
module.exports = { addUser, getUser, updateUser };
