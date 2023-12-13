import { prisma } from '../utils/prisma/index.js'

export default class ReservationRepository {
    createReservation = async ({ userId, reservationDate, sitterId }) => {
        try{
            const userData = await prisma.reservation.create({
                data: {
                    userId,
                    reservationDate,
                    sitterId
                },
            });

            return userData
        } catch (error) {
            console.error(error);
            throw error;
        }
    
    }

    getAll = async (userId, sort) => {
        try {
            const userData = await prisma.reservation.findMany({
                where: { userId: userId },
                orderBy: { createdAt: sort.toUpperCase() === 'ASC' ? 'asc' : 'desc' },
            });

            return userData; 
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    updateReservation = async (reservationDate, reservationId) => {
        try {
            const updatedReservation = await prisma.reservation.update({
                where: { reservationId: reservationId },
                data: { reservationDate: reservationDate },
            });
    
            return updatedReservation;
        } catch (error) {
            console.error(error);
            throw error; 
        }
    }

    delete = async (reservationId) => {
        const userData = await prisma.reservation.delete({
            where: { reservationId},
            
        })
    }
}
