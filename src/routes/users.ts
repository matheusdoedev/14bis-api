import express from 'express';
// controllers
import UsersController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';

const routes = express.Router();

// post - authentication
routes.post('/authentication', SessionController.postUserAuthentication);

// get - user data
routes.get('/:ID_USUARIO', UsersController.getUserData);

// pu - update user data
routes.put('/:ID_USUARIO', UsersController.putUserData);

// post - user create
routes.post('/', UsersController.postUserCreate);

export default routes;
