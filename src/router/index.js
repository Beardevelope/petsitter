import { Router } from 'express';

import { reservationRouter } from './reservationRouter.js';


const apiRouter = Router();

apiRouter.use('/reservations', reservationRouter);

export { apiRouter };