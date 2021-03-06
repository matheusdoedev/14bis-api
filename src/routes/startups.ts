import express from 'express';

import StartupController from '../app/controllers/StartupController';

import checkUserActivity from '../middlewares/checkUserActivity';

const routes = express.Router();

// get - get startup data
routes.get('/:ID_USUARIO', checkUserActivity, StartupController.getStartupData);

// put - update startup data
routes.put('/:ID_USUARIO', checkUserActivity, StartupController.putStartupData);

// post - startup create
routes.post('/', StartupController.postCreateStartup);

export default routes;
