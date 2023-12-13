import { Router } from 'express';
import { authRouter } from './authRouter.js';
import { authSitterRouter } from './authSitterRouter.js';
import { userSitterRouter } from './userSitterRouter.js';
import { userRouter } from './userRouter.js';

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/auth', authSitterRouter);
apiRouter.use('/user', userSitterRouter);
apiRouter.use('/user', userRouter);
export { apiRouter };
