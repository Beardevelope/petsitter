import { ReviewService } from '../service/reviewService.js'

export class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }

    myPage = async (req, res, next) => {
        try {
            const { id: userId } = res.locals.user;
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
            const { sitterId } = req.params;
            const data = await this.reviewService.sitter({
                sitterId
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
            const { content } = req.body;
            const { id: userId } = res.locals.user;
            const { reservationId } = req.params;
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
            const { content } = req.body;
            const { reservationId } = req.params;
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
            const { reviewId } = req.params;
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