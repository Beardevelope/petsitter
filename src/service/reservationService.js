import ReservationRepository from '../repository/reservationRepository.js'

export default class ReservationService {
    reservationRepository = new ReservationRepository();

    createService = async ({ petId, reservationDate, sitterId }) => {
        const reservation = await this.reservationRepository.createReservation({
            petId,
            reservationDate,
            sitterId
        });
        return reservation
    }

    getAll = async (sitterId, sort) => {
        const reservations = await this.reservationRepository.getAll(sitterId, sort)
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

    getMyPage = async (petId) => {
        const reservation = await this.reservationRepository.getMyPage(petId);
        return reservation;
    }
}