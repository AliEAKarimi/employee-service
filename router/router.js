const url = require("url");
const MethodNotAllowedError = require("../errorHandlers/methodNotAllowedError");
const NotFoundError = require("../errorHandlers/notFoundError");

module.exports = class Router {
  handle = {};
  addRoute(pathname, method, handler, middlewares) {
    if (!this.handle[pathname]) {
      this.handle[pathname] = {};
    }
    this.handle[pathname][method] = { handler, middlewares };
  }
  async route(request, response) {
    const { pathname } = url.parse(request.url, true);
    console.log("Routing a request for  " + pathname);
    if (!this.handle[pathname]) {
      throw new NotFoundError(`No request handler found for ${pathname}`);
    } else {
      if (typeof this.handle[pathname][request.method] === "object") {
        const { handler, middlewares } = this.handle[pathname][request.method];
        for (const middleware of middlewares) {
          if (typeof middleware === "function") {
            await middleware(request, response);
          } else if (typeof middleware === "object") {
            await middleware.function(request, response, middleware.config);
          }
        }
        await handler(request, response);
      } else {
        throw new MethodNotAllowedError(
          `Method ${request.method} not allowed for ${pathname}`
        );
      }
    }
  }
};
