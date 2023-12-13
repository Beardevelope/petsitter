import jwt from 'jsonwebtoken';
import { prisma } from '../utils/prisma/index.js';

export const needSignin = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || '').split(' ');
  if (!authToken || authType !== 'Bearer') {
    res.status(401).send({
      errorMessage: '로그인 후 이용 가능한 기능입니다.',
    });
    return;
  }

  // try , catch 를 사용한 이유 --> 에러컨트롤을 해주지 않으면 에러가 발생했을 때 서버가 꺼지는 현상이 생긴다.
  try {
    // 복호화 및 검증
    const { sitterId } = jwt.verify(authToken, process.env.JWT_ACCESS_TOKEN_SECRET);
    prisma.petSitter.findFirst({ where: { sitterId } }).then(user => {
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({
      errorMessage: '검증에 실패하였습니다.',
    });
  }
  return;
};
