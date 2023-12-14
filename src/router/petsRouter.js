import { Router } from 'express';
import PetController from '../controller/petController.js';
import { needSignin } from '../middleware/signin_middleware.js';

const petRouter = Router();
const petController = new PetController();

petRouter.get('/', needSignin, petController.getAllMyPet);
petRouter.post('/post', needSignin, petController.registerPet);
petRouter.put('/put/:petId', needSignin, petController.updatePet);
petRouter.delete('/:petId', needSignin, petController.deletePet);

export { petRouter };
