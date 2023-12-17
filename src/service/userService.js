import { UserRepository } from "../repository/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      sitterId: user.sitters.sitterId,
      email: user.email,
      role: user.role,
      career: user.sitters.career,
      name: user.sitters.name,
      createAt: user.createdAt,
    };
    return newUser;
  };

  // 일반 유저 정보 수정
  updateUser = async (userId, password, newPassword) => {
    const user = await this.userRepositpry.findNormalUSerById(userId);
    function checkPwd(str_pwd) {
      const reg = /^[A-Za-z\d@$!%*#?&]{6,}$/;
      return reg.test(str_pwd); //정규식과 매치되면 true, 매치되지않으면 false 반환.
    }
    if (!checkPwd(password)) {
      const errors = new Error("비밀번호는 최소 6자리 이상이어야 합니다.");
      errors.statusCode = 400;
      throw errors;
    }
    if (password !== newPassword) {
      const errors = new Error("비밀번호가 일치하지 않습니다.");
      errors.statusCode = 409;
      throw errors;
    }
    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(
      !password ? user.password : password,
      parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS)
    );

    // 데이터 수정
    const updateUser = await this.userRepositpry.updateNormalUser(userId, hashPassword);

    return updateUser;
  };

  // 시터 유저 정보 수정
  updatedSitterUser = async (userId, career, name) => {
    const user = await this.userRepositpry.findSitterUSerById(userId);
    // 데이터 수정 (시터 테이블 수정)
    const updateUser = await this.userRepositpry.updateSittertableUser(userId, career, name);

    return updateUser;
  };
}
