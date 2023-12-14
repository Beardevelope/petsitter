import { Router } from 'express';
import { AuthController } from '../controller/authSitterController.js';

const authSitterRouter = Router();
const authController = new AuthController();

// 회원가입 API
authSitterRouter.post('/petSitterSignUp', authController.signUp);

// 로그인 API
authSitterRouter.post('/petSitterSignIn', authController.signIn);

export { authSitterRouter };
