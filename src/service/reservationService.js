import ReservationRepository from '../repository/reservationRepository.js'

export default class ReservationService {
    reservationRepository = new ReservationRepository();
    
    createService = async (userId, reservationDate) => {
        const reservation = await this.reservationRepository.create(userId, reservationDate);
        return reservation
    } 

    getAll = async (userId, sort) => {
        const reservations = await this.reservationRepository.getAll(userId, sort)
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