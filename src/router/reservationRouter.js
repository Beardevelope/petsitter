import ReservationController from "../controller/reservationController.js";
import { Router } from 'express';
import { needSignin } from "../middleware/signin_middleware.js";
const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/', needSignin, reservationController.createController);
reservationRouter.get('/:sitterId', needSignin, reservationController.getAll);
reservationRouter.put('/:reservationId', needSignin, reservationController.updateController);
reservationRouter.delete('/:reservationId', needSignin, reservationController.deleteController);
reservationRouter.get('/', needSignin, reservationController.getMyPage);
export { reservationRouter };