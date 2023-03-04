const url = require("url");
const MethodNotAllowedError = require("../errorHandlers/methodNotAllowedError");
const NotFoundError = require("../errorHandlers/notFoundError");

module.exports = class Router {
  handle = {};
  addRoute(pathname, method, handler) {
    if (!this.handle[pathname]) {
      this.handle[pathname] = {};
    }
    this.handle[pathname][method] = handler;
  }
  route(request, response) {
    const { pathname } = url.parse(request.url, true);
    console.log("Routing a request for  " + pathname);
    if (!this.handle[pathname]) {
      throw new NotFoundError(`No request handler found for ${pathname}`);
      // throw new NotFoundError(`The path ${pathname} was not found`);
    } else {
      if (typeof this.handle[pathname][request.method] === "function") {
        this.handle[pathname][request.method](request, response);
      } else {
        throw new MethodNotAllowedError(
          `Method ${request.method} not allowed for ${pathname}`
        );
      }
    }
  }
};
