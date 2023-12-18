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
            res.status(500).json({ error: error.message })
        }
    };

    getAll = async (req, res) => {
        try {

            const { userId } = req.user
            const { sort } = req.query;
            const { sitterId } = req.params;
            if (!sitterId) throw new Error('시터를 먼저 선택해주세요.')
            const reservations = await this.reservationService.getAll(sitterId, sort)
            const reservationsWithUserId = reservations.map(reservation => ({
                ...reservation,
                userId: userId
            }));
            res.json(reservationsWithUserId)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: error.message })
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
            res.status(500).json({ error: error.message })
        }
    };

    deleteController = async (req, res) => {
        try {
            const { reservationId } = req.params;
            const reservation = await this.reservationService.deleteService(Number(reservationId));
            res.json({ messsage: '삭제 성공', reservation })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: error.message })
        }
    };

    getMyPage = async (req, res) => {
        try {
            console.log(req.user)
            const { userId } = req.user;
            const reservation = await this.reservationService.getMyPage(userId);
            res.status(201).json({
                success: true,
                message: '데이터 조회에 성공하였습니다.',
                data: reservation
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    };
}