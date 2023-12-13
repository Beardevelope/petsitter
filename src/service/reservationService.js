import ReservationRepository from '../repository/reservationRepository.js'

export default class ReservationService {
    reservationRepository = new ReservationRepository();
    
    createService = async ({ userId, reservationDate, sitterId }) => {
        const reservation = await this.reservationRepository.createReservation({
            userId, 
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
}