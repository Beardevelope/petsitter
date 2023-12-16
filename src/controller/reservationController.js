import ReservationService from '../service/reservationService.js';

export default class ReservationController {
    reservationService = new ReservationService();

    createController = async (req, res) => {
        try {
            const { petId, reservationDate, sitterId } = req.body;
            if (!reservationDate) throw new Error('예약 날짜를 선택해주세요.');

            const reservation = await this.reservationService.createService({
                petId,
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
            const { petId, sitterId } = req.body;
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
            if (!reservationDate) throw new Error('예약 날짜를 선택해주세요.');

            const reservation = await this.reservationService.updateService(reservationDate, Number(reservationId));
            res.json(reservation)
        } catch (error) {
            console.error(error)
        }
    };

    deleteController = async (req, res) => {
        try {
            const { reservationId } = req.params;
            console.log("--------------------------------reservationId--------------------------------", reservationId)
            const reservation = await this.reservationService.deleteService(Number(reservationId));
            res.json({ messsage: '삭제 성공', reservation })
        } catch (error) {
            console.error(error)
        }
    };

    getMyPage = async (req, res) => {
        try {
            console.log(res.locals.user)
            const { petId } = res.locals.user;
            console.log("petId", petId)
            const reservation = await this.reservationService.getMyPage(petId);
            res.status(201).json({
                success: true,
                message: '데이터 조회에 성공하였습니다.',
                data: reservation
            })
        } catch (error) {
        }
    };
}