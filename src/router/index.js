import { Router } from 'express';
import { authRouter } from './authRouter.js';
import { reviewRouter } from './reviewRouter.js';

const apiRouter = Router();
apiRouter.use('/auth', authRouter);
apiRouter.use('/review', reviewRouter);

export { apiRouter };
