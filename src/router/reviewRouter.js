import { Router } from "express";
import { ReviewController } from "../controller/reviewController.js";

const reviewRouter = Router();
const reviewController = new ReviewController();

//마이페이지 조회
reviewRouter.get('/myPage', reviewController.myPage);
//예약페이지 조회
reviewRouter.get('/reservation', reviewController.reservation);
//생성
reviewRouter.post('/', reviewController.reviewPost);
//수정
reviewRouter.put('/:reviewId', reviewController.reviewPut);
//삭제
reviewRouter.delete('/:reviewId', reviewController.reviewDelete);

export { reviewRouter }