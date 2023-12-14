import { Router } from 'express';
import { reviewRouter } from './reviewRouter.js';
import { reservationRouter } from './reservationRouter.js';
// import { userSitterRouter } from './userSitterRouter.js';
import { petRouter } from './petsRouter.js';

const apiRouter = Router();

// apiRouter.use('/user', userSitterRouter);
apiRouter.use('/pet', petRouter);
apiRouter.use('/reservations', reservationRouter);
apiRouter.use('/review', reviewRouter);

export { apiRouter };
