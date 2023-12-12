import { ReviewService } from '../service/reviewService.js'

export class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }
    //마이페이지에서 보는 리뷰
    myPage = async (req, res, next) => {
        try {
            const data = await this.reviewService.myPage({

            })
        } catch (err) {
            next(err);
        }
    }

    reservation = async (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }

    post = async (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }

    put = async (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {

        } catch (err) {
            next(err);
        }
    }
}