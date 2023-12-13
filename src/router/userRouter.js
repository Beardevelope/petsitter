import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllUsers);
userRouter.put('/put', userController.putUser);
export { userRouter };
