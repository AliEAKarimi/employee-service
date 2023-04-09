const http = require("http");
const url = require("url");
const { sendResponse } = require("../helpers/requestHelpers");
module.exports = class Server {
  #route;
  #host;
  #port;
  constructor(route, host, port) {
    this.#route = route;
    this.#host = host;
    this.#port = port;
  }

  async #onRequest(request, response) {
    const { pathname } = url.parse(request.url, true);
    console.log("Request for " + pathname + " received.");
    try {
      await this.#route(request, response);
    } catch (error) {
      sendResponse(response, error.statusCode ?? 500, {
        message: error.message,
      });
    }
  }

  start() {
    const server = http.createServer(this.#onRequest.bind(this));
    server.on("error", (error) => {
      console.error(`Error while starting server: ${error}`);
      process.exit(1);
    });
    server.listen(this.#port, this.#host, () => {
      console.log(`Server running at http://${this.#host}:${this.#port}/`);
    });
    console.log("Server has started.");
  }
};
