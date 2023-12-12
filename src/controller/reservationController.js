import ReservationService from '../service/reservationService.js';

export default class ReservationController {
    reservationService = new ReservationService();

    createController = async (req, res) => {
        try {
            const { reservationDate, sitterId } = req.body;
            const userId = req.user.id
            if (!reservationDate) throw new Error ('예약 날짜를 선택해주세요.');

            const reservation = await this.reservationService.createService({ 
                userId, 
                reservationDate, 
                sitterId
            })
            res.json(reservation)
        } catch (error) {
            console.error(error)
        }
    };

    getAll = async (req, res) => {
        try {
            const { sort } = req.params
            const userId = user.user.id;
            const reservations = await this.reservationService.getAll(userId, sort)
            res.json(reservations)
        } catch (error) {
            console.error(error)
        }
    };

    updateController = async (req, res) => {
        try {
            const { reservationDate } = req.body;
            const { reservationId } = req.params;
            if (!reservationDate) throw new Error ('예약 날짜를 선택해주세요.');

            const reservation = await this.reservationService.updateService(reservationDate, Number(reservationId));
            res.json(reservation)
        } catch (error) {
            console.error(error)
        }
    };

    deleteController = async (req, res) => {
        try {
            const { reservationId } = req.params;
            const reservation = await this.reservationService.deleteService(Number(reservationId));
            res.json('삭제 성공', reservation)
        } catch (error) {
            console.error(error)
        }
    };    
}