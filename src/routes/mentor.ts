import express from 'express';
// controller
import MentorController from '../app/controllers/MentorController';
// middlewares
import checkUserActivity from '../middlewares/checkUserActivity';

const routes = express.Router();

// get - get mentor data
routes.get('/:ID_USUARIO', checkUserActivity, MentorController.getMentorData);

// put - update mentor data
routes.put('/:ID_USUARIO', checkUserActivity, MentorController.putMentorData);

// post - Mentor create
routes.post('/', MentorController.postCreateMentor);

export default routes;
