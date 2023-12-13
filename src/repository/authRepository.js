import { prisma } from '../utils/prisma/index.js';

export default class AuthRepository {
  // 유저 생성
  createUser = async ({ userEmail, password, userName, petName, petType }) => {
    return prisma.User.create({
      data: { userEmail, password, userName, petName, petType },
    });
  };

  // 이메일로 유저 찾기.
  findUserByEmail = async (userEmail) => {
    const existeUser = await prisma.User.findUnique({
      where: {
        userEmail,
      },
    });
    return existeUser;
  };
}
