import ReservationController from "../controller/reservationController.js";
import { Router } from 'express';

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/', reservationController.createController);
reservationRouter.get('/', reservationController.getAll);
reservationRouter.put('/:reservationId', reservationController.updateController);
reservationRouter.delete('/:reservatonId', reservationController.deleteController);

export { reservationRouter };