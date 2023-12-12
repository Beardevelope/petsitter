import ReservationController from "../controller/reservationController.js";
import { Router } from 'express';

const router = Router();
const reservationController = new ReservationController();

router.post('/', reservationController.createController);
router.get('/', reservationController.getAll);
router.put('/:reservationId', reservationController.updateController);
router.delete('/:reservatonId', reservationController.deleteController);

export default router;