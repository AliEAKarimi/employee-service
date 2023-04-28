const { sendResponse } = require("../helpers/requestHelpers");
const httpStatusCodes = require("../errorHandlers/httpStatusCodes");
const {
  checkIdExists,
  checkParentExists,
  checkUsernameExists,
} = require("../middlewares/checkings");

module.exports = class UserController {
  #businessLogic;
  constructor(businessLogic) {
    this.#businessLogic = businessLogic;
  }

  async addUser(request, response) {
    try {
      await this.#businessLogic.addUser(request.body);
      sendResponse(response, httpStatusCodes.CREATED, {
        message: "Data added.",
      });
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }

  async updateUser(request, response) {
    try {
      await this.#businessLogic.updateUser(request.body);
      sendResponse(response, httpStatusCodes.OK, {
        message: "Data updated.",
      });
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }

  async getUser(request, response) {
    try {
      const { id, parent, username } = request.body;
      let result;
      switch (true) {
        case !!id:
          await checkIdExists(request);
          result = await this.#businessLogic.getUserInfo(id);
          break;
        case !!parent:
          await checkParentExists(request);
          result = await this.#businessLogic.getUsersIdOfAParent(parent);
          break;
        case !!username:
          await checkUsernameExists(request);
          result = await this.#businessLogic.getUserByUsername(username);
          break;
      }
      sendResponse(response, httpStatusCodes.OK, result);
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }

  async deleteUser(request, response) {
    try {
      await this.#businessLogic.deleteUser(request.body.id);
      sendResponse(response, httpStatusCodes.OK, { message: "Data deleted" });
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }
};
