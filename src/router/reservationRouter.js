import ReservationController from "../controller/reservationController.js";
import { Router } from 'express';
import { needSignin } from "../middleware/signin_middleware.js";

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/', reservationController.createController, needSignin);
reservationRouter.get('/', reservationController.getAll, needSignin);
reservationRouter.put('/:reservationId', reservationController.updateController, needSignin);
reservationRouter.delete('/:reservatonId', reservationController.deleteController, needSignin);

export { reservationRouter };