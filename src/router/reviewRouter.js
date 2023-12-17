import { Router } from "express";
import { ReviewController } from "../controller/reviewController.js";
import { needSignin } from '../middleware/usersMiddleware.js'
import { userCheck } from '../middleware/review_middleware.js'

const reviewRouter = Router();
const reviewController = new ReviewController();

//마이페이지 조회 (수정,삭제 가능)
reviewRouter.get('/myPage', needSignin, reviewController.myPage);
//예약페이지 조회 (조회만 가능)
reviewRouter.get('/sitter', reviewController.sitter);
//생성
reviewRouter.post('/', needSignin, userCheck, reviewController.post);
//수정
reviewRouter.put('/', needSignin, userCheck, reviewController.put);
//삭제
reviewRouter.delete('/', needSignin, userCheck, reviewController.delete);

export { reviewRouter }