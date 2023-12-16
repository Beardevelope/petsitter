import { Router } from 'express';
import { AuthController } from '../controller/authController.js';

const authRouter = Router();
const authController = new AuthController();

// 회원가입 API
authRouter.post('/signUp', authController.signUp);

// 로그인 API
authRouter.post('/signIn', authController.signIn);

export { authRouter };
