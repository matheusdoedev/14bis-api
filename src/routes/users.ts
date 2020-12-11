import express from "express";
// controllers
import UsersController from "../app/controllers/UserController";
import SessionController from "../app/controllers/SessionController";
// Router
const routes = express.Router();

// post - authentication
routes.post("/authentication", SessionController.postUserAuthentication);

// post - user create
routes.post("/", UsersController.postUserCreate);

export default routes;
