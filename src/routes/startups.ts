import express from "express";
// controllers
import StartupController from "../app/controllers/StartupController";
// Router
const routes = express.Router();

// post - startup create
routes.post("/", StartupController.postCreateStartup);

export default routes;
