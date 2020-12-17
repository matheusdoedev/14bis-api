import express from 'express';
// controller
import MentorController from '../app/controllers/MentorController';
// middlewares
import checkUserActivity from '../middlewares/checkUserActivity';

const routes = express.Router();

routes.get('/:ID_USUARIO', checkUserActivity, MentorController.getMentorData);

routes.put('/:ID_USUARIO', checkUserActivity, MentorController.putMentorData);

// post - Mentor create
routes.post('/', MentorController.postCreateMentor);

export default routes;
