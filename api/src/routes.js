const routes = require("express").Router();

const authMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const EmployerController = require("./app/controllers/EmployerController");

routes.post("/sessions", SessionController.store);
routes.post("/verifyemails", UserController.verifyEmail);

routes.post("/employers", EmployerController.store);

routes.use(authMiddleware);
routes.get("/employers", EmployerController.show);

module.exports = routes;
