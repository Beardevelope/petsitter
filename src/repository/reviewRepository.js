import { prisma } from '../utils/prisma/index.js';

export class ReviewRepository {
    getMe = async ({ userId }) => {
        const reservationDates = await prisma.reservation.findMany({
            where: {
                pet: {
                    userId: userId
                }
            },
            select: {
                reservationDate: true
            }
        });
        return reservationDates.map(reservation => reservation.reservationDate);
    }
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
        return reviews.map(review => {
            return {
                reviewId: review.reviewId,
                date: review.reservation.reservationDate,
                review: review.content
            };
        });
    }
    post = async ({ content, reservationId }) => {
        console.log("content, reservationId, userId", content, reservationId)
        const review = await prisma.review.create({
            data: { content, reservationId }
        })
        return review
    }
    put = async ({ content, reviewId }) => {
        console.log("content, reviewId", content, reviewId)
        const review = await prisma.review.findUnique({ where: { reviewId } })
        if (!review) {
            throw new HttpStatus.NotFound('상품 조회에 실패했습니다.');
        }
        const reviewUpdate = await prisma.review.update({
            where: { reviewId },
            data: {
                ...(content && { content })
            },
        })
        return reviewUpdate
    }
    delete = async ({ reviewId }) => {
        const review = await prisma.review.delete({
            where: { reviewId }
        });
        return review
    }
}