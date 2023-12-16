import { UserRepository } from "../repository/userRepository.js";
import bcrypt from "bcrypt";

export class UserService {
  userRepositpry = new UserRepository();

  // 시터 전체 목록 조회
  findAllSitterUser = async () => {
    const users = await this.userRepositpry.getSitterUsers();
    if (!users) {
      const errors = new Error("조회할 유저가 없습니다.");
      errors.statusCode = 404;
      throw errors;
    }

    return users.map((user) => {
      return {
        userId: user.userId,
        email: user.email,
        role: user.role,
        sitterId: user.sitters.sitterId,
        career: user.sitters.career,
        name: user.sitters.name,
        createdAt: user.createdAt,
      };
    });
  };

  // 시터 상세 조회
  findOneSitterUser = async (userId) => {
    const user = await this.userRepositpry.findSitterUSerById(userId);
    if (!user) {
      const errors = new Error("조회할 유저가 없습니다.");
      errors.statusCode = 404;
      throw errors;
    }
    const newUser = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      career: user.sitters.career,
      name: user.sitters.name,
      createAt: user.createdAt,
    };
    return newUser;
  };

  // 일반 유저 정보 수정
  updatedNormalUser = async (userId, password, newPassword) => {
    const user = await this.userRepositpry.findNormalUSerById(userId);
    if (user.userId !== userId) {
      const errors = new Error("수정할 권한이 없습니다.");
      errors.statusCode = 403;
      throw errors;
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      const errors = new Error("비밀번호가 일치하지 않습니다.");
      errors.statusCode = 400;
      throw errors;
    }

    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(
      newPassword,
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
    );

    // 데이터 수정
    await this.userRepositpry.updateNormalUser(userId, hashPassword);

    // 수정된 데이터 가져오기
    const updateUser = await this.userRepositpry.findNormalUSerById(userId);

    return updateUser;
  };

  // 시터 유저 정보 수정
  updatedSitterUser = async (userId, career, name, password, newPassword) => {
    const user = await this.userRepositpry.findSitterUSerById(userId);
    if (user.userId !== userId) {
      const errors = new Error("수정할 권한이 없습니다.");
      errors.statusCode = 403;
      throw errors;
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      const errors = new Error("비밀번호가 일치하지 않습니다.");
      errors.statusCode = 400;
      throw errors;
    }

    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(
      newPassword,
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
    );

    // 데이터 수정 (유저 테이블 수정)
    await this.userRepositpry.updateSitterUser(userId, hashPassword);

    // 데이터 수정 (시터 테이블 수정)
    await this.userRepositpry.updateSittertableUser(userId, career, name);

    // 수정된 데이터 가져오기
    const updateUser = await this.userRepositpry.findSitterUSerById(userId);

    return updateUser;
  };

  //   // 시터 유저 정보 삭제
  //   deletedUser = async (userId) => {
  //     const user = await this.userRepositpry.findUSerById(userId);
  //     if (user.userId !== userId) {
  //       const errors = new Error('삭제할 권한이 없습니다.');
  //       errors.statusCode = 403;
  //       throw errors;
  //     }
  //
  //     await this.userRepositpry.deleteUser(userId);
  //
  //     return user;
  //   };
}
