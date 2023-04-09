const Server = require("./server/server");
const UserController = require("./controllers/userController");
const UserService = require("./services/userService");
const { RequestMethod } = require("./helpers/requestMethod");
const Router = require("./router/router");
const { isOperationalError } = require("./errorHandlers/errorHandler");
const {
  userSchema,
  getUserQuerySchema,
  idSchema,
} = require("./schemas/schemas");
const bodyParser = require("./middlewares/bodyParser");
const queryParamsParser = require("./middlewares/queryParamsParser");
const dataValidator = require("./middlewares/dataValidator");
const {
  checkIdNotDuplicated,
  checkParentExists,
  checkIdExists,
} = require("./middlewares/checkings");
const dotenv = require("dotenv");
dotenv.config();

process.on("unhandledRejection", (error) => {
  console.error(`Unhandled rejection: ${error.stack}`);
  throw error;
});
process.on("uncaughtException", (error) => {
  if (!isOperationalError(error)) {
    console.error(`Uncaught exception: ${error.stack}`);
    process.exit(1);
  }
});

const router = new Router();
const userService = new UserService();
const userController = new UserController(userService);

// add routes
router.addRoute(
  "/dataService",
  RequestMethod.POST,
  userController.addUser.bind(userController),
  [
    { function: bodyParser },
    { function: dataValidator, config: { schema: userSchema } },
    checkIdNotDuplicated,
    checkParentExists,
  ]
);
router.addRoute(
  "/dataService",
  RequestMethod.PUT,
  userController.updateUser.bind(userController),
  [
    { function: bodyParser },
    { function: dataValidator, config: { schema: userSchema } },
    checkIdExists,
    checkParentExists,
  ]
);
router.addRoute(
  "/dataService",
  RequestMethod.GET,
  userController.getUser.bind(userController),
  [
    { function: queryParamsParser },
    { function: dataValidator, config: { schema: getUserQuerySchema } },
    checkIdExists,
  ]
);
router.addRoute(
  "/dataService",
  RequestMethod.DELETE,
  userController.deleteUser.bind(userController),
  [
    { function: bodyParser },
    { function: dataValidator, config: { schema: idSchema } },
    checkIdExists,
  ]
);

const server = new Server(
  router.route.bind(router),
  process.env.SERVER_HOST,
  process.env.SERVER_PORT
);
// start server
server.start();
