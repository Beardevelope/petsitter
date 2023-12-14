import { prisma } from '../utils/prisma/index.js';

export class ReviewRepository {
    getMe = async ({ userId }) => {
        const reviews = await prisma.review.findMany({
            where: { userId }
        })
        return reviews
    }
    getSitter = async ({ reservationId }) => {
        const reviews = await prisma.review.findMany({
            where: { reservationId }
        })
        return reviews
    }
    post = async ({ content, reservationId, userId }) => {
        console.log("content, reservationId, userId", content, reservationId, userId)
        const review = await prisma.review.create({
            data: { content, reservationId, userId, updatedAt: new Date(), createdAt: new Date() }
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