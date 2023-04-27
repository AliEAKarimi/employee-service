const { sendResponse } = require("../helpers/requestHelpers");
const httpStatusCodes = require("../errorHandlers/httpStatusCodes");

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
      const result = await this.#businessLogic.getUserInfo(request.body.id);
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

  async getUsersOfAParent(request, response) {
    try {
      const users = await this.#businessLogic.getUsersOfAParent(request.body.parent);
      sendResponse(response, httpStatusCodes.OK, users);
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }
};
