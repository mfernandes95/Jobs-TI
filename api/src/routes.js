const routes = require("express").Router();

const authMiddleware = require("./app/middlewares/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const EmployerController = require("./app/controllers/EmployerController");
const JobController = require("./app/controllers/JobController");

routes.post("/sessions", SessionController.store);
routes.post("/verifyemails", UserController.verifyEmail);

routes.post("/employers", EmployerController.store);

// routes.use(authMiddleware);
routes.get("/employers", authMiddleware, EmployerController.show);

routes.post("/jobs", authMiddleware, JobController.store);
routes.get("/jobs", authMiddleware, JobController.indexMyJobs);
routes.put("/jobs/:id", authMiddleware, JobController.update);
routes.delete("/jobs/:id", authMiddleware, JobController.delete);
routes.get("/jobs/:id", authMiddleware, JobController.show);
routes.get("/alljobs", JobController.indexAllJobs);

module.exports = routes;
