import { prisma } from '../utils/prisma/index.js';

export class ReviewRepository {
    getMe = async ({ userId }) => {
        const result = await prisma.reservation.findMany({
            where: {
                pets: {
                    user: {
                        userId: 1,
                    },
                },
            },
            include: {
                pets: true,
                review: true,
            },
            orderBy: {
                reservationDate: 'asc',
            },
        });
        // return result
        return result.map(result => ({
            reservationId: result.reservationId,
            reservationDate: result.reservationDate,
            // review: result.review
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

        return reviews.map(review => ({
            reviewId: review.reviewId,
            date: review.reservation.reservationDate,
            review: review.content
        }));
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
        const review = await prisma.review.findUnique({ where: { reviewId: reviewId } })
        console.log("review 정보", review)
        console.log("!review", review == null)
        if (review == null) {
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