import { prisma } from "../utils/prisma/index.js";

export class UserRepository {
  // 시터 전체 목록 조회
  getSitterUsers = async () => {
    const users = await prisma.users.findMany({
      where: {
        role: "sitter",
      },
      select: {
        userId: true,
        email: true,
        role: true,
        sitters: {
          select: {
            sitterId: true,
            career: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
    return users;
  };

  // userId를 통한 일반 유저 찾기
  findNormalUSerById = async (userId) => {
    const user = await prisma.users.findFirst({
      where: {
        userId: +userId,
        role: "normal",
      },
      select: {
        userId: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
      },
    });
    return user;
  };



  // userId를 통한 시터 유저 찾기
  findSitterUSerById = async (userId) => {
    const user = await prisma.users.findFirst({
      where: {
        userId: +userId,
        role: "sitter",
      },
      select: {
        userId: true,
        email: true,
        password: true,
        role: true,
        sitters: {
          select: {
            sitterId: true,
            career: true,
            name: true,
          },
        },
        createdAt: true,
      },
    });
    return user;
  };

  // 일반 유저 정보 수정
  updateNormalUser = async (userId, hashPassword) => {
    const user = await prisma.users.update({
      where: {
        userId: +userId,
      },
      data: {
        password: hashPassword,
      },
    });
    return user;
  };

  // 시터 유저 정보 수정
  updateSitterUser = async (userId, hashPassword) => {
    const user = await prisma.users.update({
      where: {
        userId: +userId,
      },
      data: {
        password: hashPassword,
      },
    });
    return user;
  };

  // 시터유저 정보 수정 (시터테이블)
  updateSittertableUser = async (userId, career, name) => {
    const user = await prisma.sitters.update({
      where: {
        userId: +userId,
      },
      data: {
        career,
        name,
      },
    });
    return user;
  };
}
