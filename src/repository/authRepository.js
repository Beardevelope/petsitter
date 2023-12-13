import { prisma } from '../../utils/prisma/index.js';

export default class AuthRepository {
  createUser = async ({ userEmail, password, userName, petName, petType }) => {
    return prisma.User.create({
      data: { userEmail, password, userName, petName, petType },
    });
  };

  findUserByEmail = async (userEmail) => {
    const existeUser = await prisma.User.findUnique({
      where: {
        userEmail,
      },
    });
    return existeUser;
  };
}
