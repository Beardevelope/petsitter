import { Router } from 'express';
import AuthController from '../controller/auth.contoller.js';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signupUser);
authRouter.post('/signin', authController.signInUser);

export { authRouter };
