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
        const reviews = await this.reviewRepository.getSitter({ sitterId })
        return reviews
    }

    post = async ({ content, reservationId }) => {
        const review = await this.reviewRepository.post({ content, reservationId })
        return review
    }

    put = async ({ content, reservationId }) => {
        const review = await this.reviewRepository.put({ content, reservationId })
        return review
    }
    delete = async ({ reservationId }) => {
        const review = await this.reviewRepository.delete({ reservationId })
        return review
    }
}