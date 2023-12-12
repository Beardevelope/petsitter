import { Router } from 'express';
import AuthController from '../controller/authContoller.js';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signupUser);
authRouter.post('/signin', authController.signInUser);

export { authRouter };
