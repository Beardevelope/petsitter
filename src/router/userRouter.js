import { Router } from 'express';
import UserController from '../controller/userController.js';
import { needSignin } from '../middleware/signin_middleware.js';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllUsers);
userRouter.put('/put', needSignin, userController.putUser);
userRouter.get('/me', needSignin, userController.getUserOfMe);
export { userRouter };
