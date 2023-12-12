import { ReviewRepository } from '../repository/reviewRepository.js';

export class ReviewService {
    constructor() {
        this.reviewRepository = new ReviewRepository();
    }
    myPage = async ({ userId }) => {
        const reviews = await this.reviewRepository.getMe({
            userId
        })
        return reviews
    }

    sitter = async ({ sitterId }) => {
        const reviews = await this.reviewRepository.getSitter({
            sitterId
        })
        return reviews
    }

    post = async ({ content, reservationId, userId }) => {
        const review = await this.reviewRepository.post(content, reservationId, userId)
        return review
    }

    put = async ({ content, reviewId }) => {
        const review = await this.reviewRepository.put(content, reviewId)
        return review
    }
    delete = async ({ reviewId }) => {
        const review = await this.reviewRepository.delete(reviewId)
        return review
    }
}