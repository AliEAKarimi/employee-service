const controller = require("./controllers/controller");
const { RequestMethod } = require("./models/requestMethod");
const Router = require("./router/router");


const router = new Router();
// add routes
router.addRoute("/dataService", RequestMethod.POST, controller.addUser);
router.addRoute("/dataService", RequestMethod.GET, controller.getUser);
router.addRoute("/dataService", RequestMethod.PUT, controller.updateUser);
