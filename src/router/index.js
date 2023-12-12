import { Router } from 'express';
import { authRouter } from './authRouter.js';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/products', productRouter);

export { apiRouter };
