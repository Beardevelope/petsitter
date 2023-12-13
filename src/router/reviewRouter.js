import { Router } from "express";
import { ReviewController } from "../controller/reviewController.js";
import { needSignin } from '../middleware/signin_middleware.js'

const reviewRouter = Router();
const reviewController = new ReviewController();

//마이페이지 조회
reviewRouter.get('/myPage/', reviewController.myPage);
//예약페이지 조회
reviewRouter.get('/sitter', reviewController.sitter);
//생성
reviewRouter.post('/', reviewController.post);
//수정
reviewRouter.put('/', reviewController.put);
//삭제
reviewRouter.delete('/', reviewController.delete);

export { reviewRouter }