const routes = require("express").Router();

const authMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");
const CarController = require("./app/controllers/CarController");
const UserController = require("./app/controllers/UserController");

routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

// routes.use(authMiddleware);

// CARS
routes.post("/cars", authMiddleware, CarController.store);
routes.get("/cars", authMiddleware, CarController.index);
routes.get("/cars/:id", authMiddleware, CarController.show);
routes.put("/cars/:id", authMiddleware, CarController.update);
routes.delete("/cars/:id", authMiddleware, CarController.delete);

module.exports = routes;
