import express from 'express';

import UsersController from '../app/controllers/UserController';
import SessionController from '../app/controllers/SessionController';

import checkUserActivity from '../middlewares/checkUserActivity';

const routes = express.Router();

// post - authentication
routes.post('/authentication', SessionController.postUserAuthentication);

// get - user data
routes.get('/:ID_USUARIO', checkUserActivity, UsersController.getUserData);

// pu - update user data
routes.put('/:ID_USUARIO', checkUserActivity, UsersController.putUserData);

// post - user create
routes.post('/', UsersController.postUserCreate);

export default routes;
