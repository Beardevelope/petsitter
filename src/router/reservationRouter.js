import ReservationController from "../controller/reservationController.js";
import { Router } from 'express';
import { needSignin } from "../middleware/signin_middleware.js";

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/',  reservationController.createController);
reservationRouter.get('/',  reservationController.getAll);
reservationRouter.put('/:reservationId',  reservationController.updateController);
reservationRouter.delete('/:reservationId',  reservationController.deleteController);
reservationRouter.get('/myPage', reservationController.getMyPage);
export { reservationRouter };