import { ReviewService } from '../service/reviewService.js'

export class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }

    myPage = async (req, res, next) => {
        try {
            // const { id: userId } = res.locals.user;
            const { userId } = req.body;
            const data = await this.reviewService.myPage({
                userId
            })
            return res.status(201).json({
                success: true,
                message: '데이터 조회에 성공하였습니다.',
                data
            })
        } catch (err) {
            next(err);
        }
    }

    sitter = async (req, res, next) => {
        try {
            const { reservationId } = req.body;
            const data = await this.reviewService.sitter({
                reservationId
            })
            return res.status(201).json({
                success: true,
                message: '데이터 조회에 성공하였습니다.',
                data
            })
        } catch (err) {
            next(err);
        }
    }

    post = async (req, res, next) => {
        try {
            const { content, reservationId } = req.body;
            // const { id: userId } = res.locals.user;
            const userId = 1;
            const data = await this.reviewService.post({
                content,
                reservationId,
                userId
            })
            return res.status(201).json({
                success: true,
                message: '데이터 생성에 성공하였습니다.',
                data
            })
        } catch (err) {
            next(err);
        }
    }

    put = async (req, res, next) => {
        try {
            const { content, reviewId } = req.body;
            const data = await this.reviewService.put({
                content,
                reviewId
            })
            return res.status(201).json({
                success: true,
                message: '데이터 수정에 성공하였습니다.',
                data
            })
        } catch (err) {
            next(err);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { reviewId } = req.body;
            const data = await this.reviewService.delete({
                reviewId
            })
            return res.status(201).json({
                success: true,
                message: '데이터 삭제에 성공하였습니다.',
                data
            })
        } catch (err) {
            next(err);
        }
    }
}