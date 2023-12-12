import { Router } from 'express';
import { authRouter } from './authRouter.js';
import { reservationRouter } from './reservationRouter.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productRouter);
apiRouter.use('/reservations', reservationRouter)

export { apiRouter };
