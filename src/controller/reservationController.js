import ReservationService from '../service/reservationService.js';

export default class ReservationController {
    reservationService = new ReservationService();

    createController = async (req, res) => {
        try {
            const { reservationDate, sitterId } = req.body;
            const userId = 1
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
            const { sort } = req.query;
            const { sitterId } = req.body;
            const reservations = await this.reservationService.getAll(sitterId, sort)
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
            console.log(reservationId)
            const reservation = await this.reservationService.deleteService(Number(reservationId));
            res.json({ messsage: '삭제 성공', reservation })
        } catch (error) {
            console.error(error)
        }
    };    
}