import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
  // email로 db에서 유저 정보 가져오기
  findUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });
    return user;
  };


  // 유저 회원가입
  createUser = async (email, role, password) => {
    const user = await prisma.users.create({
      data: {
        email,
        role,
        password
      },
    });
    return user;
  };


  createSitterDetails = async (name, career, userId) => {
    const user = await prisma.sitters.create({
      data: {
        career,
        name,
        userId
      }
    })
    return user;
  }
}