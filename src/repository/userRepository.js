import { prisma } from '../utils/prisma/index.js';

export default class UserRepository {
  // user find totally
  getAllUserRepository = async () => {
    const user = await prisma.User.findMany({
      select: {
        userId: true,
        userName: true,
        petType: true,
        petName: true,
      },
    });
    return user;
  };

  // find user by index
  findIndex = async (userId) => {
    const index = prisma.User.findIndex((User) => User.userId === +userId);
    return index;
  };

  // find user by userId
  findUserById = async (userId) => {
    const user = await prisma.User.findFirst({
      where: {
        userId: +userId,
      },
      select: {
        userId: true,
        userName: true,
        petName: true,
        petType: true,
      },
    });
    return user;
  };

  // User Info update
  updatedUser = async (userId, userName, petName, petType, password) => {
    const user = await prisma.User.update({
      where: {
        userId: +userId,
      },
      data: {
        userName,
        petName,
        petType,
        password,
      },
    });
    return user;
  };

  // user info delete
  deleteUser = async (userId) => {
    const user = await prisma.User.delete({
      where: {
        userId: userId,
      },
    });

    return user;
  };
}
