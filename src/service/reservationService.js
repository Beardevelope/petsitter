import ReservationRepository from '../repository/reservationRepository.js'
import { UserRepository } from "../repository/userRepository.js";
export default class ReservationService {
    reservationRepository = new ReservationRepository();
    userRepository = new UserRepository();

    createService = async ({ petId, reservationDate, sitterId }) => {
        const reservationAlreadyExists = this.reservationRepository.getMyReservation(reservationDate, sitterId);
        if ((await reservationAlreadyExists).length > 0) throw new Error('이미 예약된 날짜입니다.');
        const reservation = await this.reservationRepository.createReservation({
            petId,
            reservationDate,
            sitterId
        });
        return reservation
    }

    getAll = async (sitterId, sort) => {
        const reservations = await this.reservationRepository.getAll(sitterId, sort)
        if (await (reservations.length).length <= 0) throw new Error('')
        return reservations
    };

    updateService = async (reservationDate, reservationId) => {
        const reservation = await this.reservationRepository.updateReservation(reservationDate, reservationId);
        return reservation
    };

    deleteService = async (reservationId) => {
        const reservation = await this.reservationRepository.delete(reservationId);
        return reservation
    }

    getMyPage = async (userId) => {
        const sitterInfo = await this.userRepository.findSitterUSerById(userId);
        const reservation = await this.reservationRepository.getMyPage(sitterInfo.sitters.sitterId);
        return reservation;
    }
}