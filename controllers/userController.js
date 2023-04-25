const { sendResponse } = require("../helpers/requestHelpers");
const httpStatusCodes = require("../errorHandlers/httpStatusCodes");

module.exports = class UserController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  async addUser(request, response) {
    try {
      await this.#service.addUser(request.body);
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
      await this.#service.updateUser(request.body);
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
      const result = await this.#service.getUserInfo(request.body.id);
      sendResponse(response, httpStatusCodes.OK, result);
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }

  async deleteUser(request, response) {
    try {
      await this.#service.deleteUser(request.body.id);
      sendResponse(response, httpStatusCodes.OK, { message: "Data deleted" });
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }
};
