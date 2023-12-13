import UserRepository from '../repository/userRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserService {
  userRepository = new UserRepository();

  // 전체유저 조회하기
  getAllUser = async () => {
    return await this.userRepository.getAllUserRepository();
  };

  // 유저 아이디로 인덱스 찾기
  findIndexOfUserById = (userId) => {
    const index = findIndex(userId);
    if (index === -1) {
      throw Error('유저를 찾을 수 없습니다.');
    }
    return index;
  };

  // user Info update

  updatedUser = async (userId, password, userName, petName, petType) => {
    const user = await this.userRepository.findUserById({ userId });
    if (!user) throw Error('존재하지 않는 회원입니다.');
    // const user = await this.userRepository.findUserById(userId);

    await this.userRepository.updatedUser(
      userId,
      password,
      userName,
      petName,
      petType
    );

    const updateUser = await this.userRepository.findUserById(userId);
    return updateUser;
  };

  // user Info delete

  deleteUser = async (userId) => {
    const user = await this.userRepository.findUserById(userId);
    if (user.userId !== userId) throw new Error('삭제 권한이 없습니다.');

    await this.userRepository.deleteUser(userId);

    return user;
  };
}
