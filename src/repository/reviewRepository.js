import { prisma } from '../utils/prisma/index.js';

export class ReviewRepository {
    getMe = async ({ userId }) => {
        const result = await prisma.reservation.findMany({
            where: {
                pets: {
                    user: {
                        userId,
                    },
                },
            },
            include: {
                sitter: true,
                pets: true,
                review: true,
            },
            orderBy: {
                reservationDate: 'desc',
            },
        });
        console.log(result);
        // return result
        return result.map(result => ({
            sitterName: result.sitter.name,
            reservationId: result.reservationId,
            reservationDate: result.reservationDate,
            petName: result.pets.petName,
            review: result.review !== null ? result.review.content : null,
            reviewId: result.review !== null ? result.review.reviewId : null
        }));
    };
    getSitter = async ({ sitterId }) => {
        const reviews = await prisma.review.findMany({
            where: {
                reservation: {
                    sitterId: sitterId
                }
            },
            select: {
                reviewId: true,
                reservation: {
                    select: {
                        reservationDate: true
                    }
                },
                content: true
            }
        });
        console.log()
        console.log()
        console.log()
        console.log()
        console.log('---------reviews----------', reviews)
        console.log()
        console.log()
        console.log()
        console.log()
        console.log()
        return reviews.map(review => ({
            reviewId: review.reviewId,
            date: review.reservation.reservationDate,
            review: review.content
        }));
    }
    post = async ({ content, reservationId }) => {
        console.log(":content, reservationId", content, reservationId)
        reservationId = Number(reservationId)
        const review = await prisma.review.create({
            data: { content, reservationId }
        })
        return review
    }
    put = async ({ content, reservationId }) => {
        reservationId = Number(reservationId)
        const review = await prisma.review.findUnique({ where: { reservationId: reservationId } })
        if (review == null) {
            throw new HttpStatus.NotFound('상품 조회에 실패했습니다.');
        }
        const reviewUpdate = await prisma.review.update({
            where: { reservationId },
            data: {
                ...(content && { content })
            },
        })
        return reviewUpdate
    }
    delete = async ({ reservationId }) => {
        reservationId = Number(reservationId)
        console.log("reservationId", reservationId)
        const review = await prisma.review.delete({
            where: { reservationId: reservationId }
        });
        return review
    }
}