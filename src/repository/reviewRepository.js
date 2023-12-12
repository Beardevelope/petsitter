import { prisma } from '../utils/prisma/index.js';

export class ReviewRepository {
    getMe = async ({ userId }) => {
        const reviews = await prisma.reviews.findMany({
            where: { userId }
        })
        return reviews
    }
    getSitter = async ({ sitterId }) => {
        const reviews = await prisma.reviews.findMany({
            where: { sitterId }
        })
        return reviews
    }
    post = async ({ content, reservationId, userId }) => {
        const review = await prisma.reviews.create({
            data: { content, reservationId, userId }
        })
        return review
    }
    put = async ({ content, reviewId }) => {
        const review = await prisma.reviews.update({
            where: { reviewId },
            data: {
                ...(content && { content })
            },
        })
        return review
    }
    delete = async ({ reviewId }) => {
        const review = await prisma.reviews.delete({
            where: { reviewId }
        });
        return review
    }
}