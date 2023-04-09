const { sendResponse } = require("../helpers/requestHelpers");
const httpStatusCodes = require("../errorHandlers/httpStatusCodes");

module.exports = class UserController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  async addUser(request, response) {
    await this.#service.addUser(request.body);
    sendResponse(response, httpStatusCodes.CREATED, {
      message: "Data added.",
    });
  }

  async updateUser(request, response) {
    await this.#service.updateUser(request.body);
    sendResponse(response, httpStatusCodes.OK, {
      message: "Data updated.",
    });
  }

  async getUser(request, response) {
    const result = await this.#service.getUserInfo(request.body.id);
    sendResponse(response, httpStatusCodes.OK, result);
  }

  async deleteUser(request, response) {
    await this.#service.deleteUser(request.body.id);
    sendResponse(response, httpStatusCodes.OK, { message: "Data deleted" });
  }
};
