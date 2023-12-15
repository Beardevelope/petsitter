import { Router } from 'express';
import { UserController } from '../controller/userController.js';
import { needSignin } from '../middleware/usersMiddleware.js';

const userRouter = Router();

const userController = new UserController();


// 시터 전체 목록 조회
userRouter.get('/', userController.getSitterUSers)

// 시터 상세 조회
userRouter.get('/:id', userController.getSitterUser)

// 내 정보 조회 API
userRouter.get('/info/me', needSignin, userController.userInfo);

// 내 정보 수정 API
userRouter.put('/info/me', needSignin, userController.putUser);

// // 시터 정보 삭제 API
// userSitterRouter.delete('info/me', needSignin, userController.deleteUser)

export { userRouter };