import { Router } from 'express';
import { reviewRouter } from './reviewRouter.js';
import { reservationRouter } from './reservationRouter.js';
import { userRouter } from './userRouter.js';
import { petRouter } from './petsRouter.js';
import { authRouter } from './authRouter.js';

const apiRouter = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/pet', petRouter);
apiRouter.use('/reservations', reservationRouter);
apiRouter.use('/review', reviewRouter);
apiRouter.use('/auth', authRouter);

export { apiRouter };