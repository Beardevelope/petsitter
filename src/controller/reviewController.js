import { ReviewService } from '../service/reviewService.js'

export class ReviewController {
    constructor() {
        this.reviewService = new ReviewService();
    }

    myPage = async (req, res, next) => {
        try {
            const { userId } = req.user;
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
            const { sitterId } = req.body;
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
            const { userId } = req.user;
            const { content, reservationId } = req.body;
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
            const { content, reservationId } = req.body;
            const data = await this.reviewService.put({
                content,
                reservationId
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
            const { reservationId } = req.body;
            const data = await this.reviewService.delete({
                reservationId
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