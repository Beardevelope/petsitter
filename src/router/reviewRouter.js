import { Router } from "express";
import { ReviewController } from "../controller/reviewController.js";
import { needSignin } from '../middleware/usersMiddleware.js'

const reviewRouter = Router();
const reviewController = new ReviewController();

//마이페이지 조회 (수정,삭제 가능)
reviewRouter.get('/myPage', needSignin, reviewController.myPage);
//예약페이지 조회 (조회만 가능)
reviewRouter.get('/sitter', reviewController.sitter);
//생성
reviewRouter.post('/', needSignin, reviewController.post);
//수정
reviewRouter.put('/', needSignin, reviewController.put);
//삭제
reviewRouter.delete('/', needSignin, reviewController.delete);

export { reviewRouter }