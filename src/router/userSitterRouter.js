import { Router } from 'express';
import { UserController } from '../controller/userSitterController.js';
import { needSignin } from '../middleware/signInSitterMiddleware.js';

const userSitterRouter = Router();

const userController = new UserController();


// 시터 전체 유저 목록 조회
userSitterRouter.get('/petSitter', userController.getSitterUSers)

// 시터 유저 상테 조회
userSitterRouter.get('/petSitter/:id', userController.getSitterUser)

// 시터 정보 조회 API
userSitterRouter.get('/petSitter/info/me', needSignin, userController.sitterInfo);

// 시터 정보 수정 API
userSitterRouter.put('/petSitter/info/me', needSignin, userController.putUser);

// 시터 정보 삭제 API
userSitterRouter.delete('/petSitter/info/me', needSignin, userController.deleteUser)

export { userSitterRouter };