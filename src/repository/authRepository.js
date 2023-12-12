import { prisma } from '../../utils/prisma/index.js';

export default class AuthRepository {
  createUser = async ({
    email,
    password,
    name,
    userName,
    petName,
    petType,
  }) => {
    return prisma.User.create({
      data: { email, password, name, userName, petName, petType },
    });
  };
}
