const Server = require("./server/server");
const controller = require("./controllers/controller");
const { RequestMethod } = require("./models/requestMethod");
const Router = require("./router/router");
const { isOperationalError } = require("./errorHandlers/errorHandler");
const dotenv = require("dotenv");
dotenv.config();

const router = new Router();
// add routes
router.addRoute("/dataService", RequestMethod.POST, controller.addUser);
router.addRoute("/dataService", RequestMethod.GET, controller.getUser);
router.addRoute("/dataService", RequestMethod.PUT, controller.updateUser);

const server = new Server(
  router.route.bind(router),
  process.env.SERVER_HOST,
  process.env.SERVER_PORT
);
// start server
server.start();
