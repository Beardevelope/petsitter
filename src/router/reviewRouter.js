import { Router } from "express";
import { ReviewController } from "../controller/reviewController.js";

const reviewRouter = Router();
const reviewController = new ReviewController();

//마이페이지 조회
reviewRouter.get('/myPage', reviewController.myPage);
//예약페이지 조회
reviewRouter.get('/sitter', reviewController.sitter);
//생성
reviewRouter.post('/', reviewController.post);
//수정
reviewRouter.put('/:reviewId', reviewController.put);
//삭제
reviewRouter.delete('/:reviewId', reviewController.delete);

export { reviewRouter }