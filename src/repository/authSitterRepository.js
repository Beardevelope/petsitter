import { prisma } from '../utils/prisma/index.js';

export class AuthRepository {
  // email로 db에서 유저 정보 가져오기
  findUserByEmail = async sitterEmail => {
    const user = await prisma.petSitter.findFirst({
      where: {
        sitterEmail,
      },
    });
    return user;
  };

  //회원가입
  createUser = async (sitterEmail, sitterName, nickName, career, password) => {
    const user = await prisma.petSitter.create({
      data: {
        sitterEmail,
        sitterName,
        nickName,
        career,
        password,
      },
    });
    return user;
  };
}
