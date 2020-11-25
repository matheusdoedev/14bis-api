import express from "express";
// controllers
import UsersController from "../app/controllers/UserController";
// Router
const routes = express.Router();

// post - user create
routes.post("/", UsersController.postUserCreate);

export default routes;
