import { prisma } from '../utils/prisma/index.js';

export class UserRepository {
  // 시터 전체 목록 조회
  getSitterUsers = async () => {
    const users = await prisma.petSitter.findMany({
      select: {
        sitterId: true,
        sitterName: true,
        career: true,
      },
    });

    return users;
  };

  // userId를 통한 유저 찾기
  findUSerById = async (sitterId) => {
    const user = await prisma.petSitter.findFirst({
      where: {
        sitterId: +sitterId,
      },
      select: {
        sitterId: true,
        sitterName: true,
        career: true,
      },
    });
    return user;
  };

  // 시터 유저 정보 수정
  updateUser = async (sitterId, sitterName, career) => {
    const user = await prisma.petSitter.update({
      where: {
        sitterId: +sitterId,
      },
      data: {
        sitterName,
        career,
      },
    });
    return user;
  };

  // 시터 유저 정보 삭제
  deleteUser = async (sitterId) => {
    const user = await prisma.petSitter.delete({
      where: {
        sitterId: +sitterId,
      },
    });

    return user;
  };
}
