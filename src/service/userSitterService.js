import { UserRepository } from '../repository/userSitterRepository.js';

export class UserService {
  userRepositpry = new UserRepository();

  // 시터 전체 목록 조회
  findAllSitterUser = async () => {
    const users = await this.userRepositpry.getSitterUsers();
    if(!users) {
      const errors = new Error('조회할 유저가 없습니다.');
      errors.statusCode = 404;
      throw errors;
    }

    return users
  }

  // 시터 상세 조회
  findOneSitterUser = async (sitterId) => {
    const user = await this.userRepositpry.findUSerById(sitterId);
    if(!user) {
      const errors = new Error('조회할 유저가 없습니다.');
      errors.statusCode = 404;
      throw errors;
    }

    return user
  }


  // 시터 유저 정보 수정
  updatedUser = async (sitterId, sitterName, career) => {
    const user = await this.userRepositpry.findUSerById(sitterId);
    if (user.sitterId !== sitterId) {
      const errors = new Error('수정할 권한이 없습니다.');
      errors.statusCode = 403;
      throw errors;
    }

    await this.userRepositpry.updateUser(sitterId, sitterName, career);

    const updateUser = await this.userRepositpry.findUSerById(sitterId);

    return updateUser;
  };

  // 시터 유저 정보 삭제
  deletedUser = async (sitterId) => {
    const user = await this.userRepositpry.findUSerById(sitterId);
    if (user.sitterId !== sitterId) {
      const errors = new Error('삭제할 권한이 없습니다.');
      errors.statusCode = 403;
      throw errors;
    }

    await this.userRepositpry.deleteUser(sitterId);

    return user;
  };
}
