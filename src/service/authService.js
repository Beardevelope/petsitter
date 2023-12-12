import AuthRepository from '../repository/auth.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthService {
  authRepository = new AuthRepository();
  signupUser = async (
    email,
    password,
    passwordConfirm,
    userName,
    petName,
    petType
  ) => {
    if (password !== passwordConfirm) {
      throw new Error('입력한 비밀번호가 서로 일치하지 않습니다.');
    }
    if (!petName || !petType) {
      throw new Error(' 반려동물의 타입과, 이름은 필수적으로 입력해야합니다.');
    }

    if (!userName) {
      throw new Error(' 사용자 이름은 필수 기재 사항입니다.');
    }
    if (password.length < 6) {
      throw new Error('비밀번호는 최소 6자리 이상이어야 합니다.');
    }

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(email);
    if (!isValidEmail) {
      throw new Error('이메일 형식이 맞지 않습니다.');
    }
  };

  signInUser = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('이메일과 비밀번호 입력은 필수 사항입니다.');
      }
      const user = await this.authRepository.findUserByEmail(email);

      if (!user) {
        throw new Error('일치하는 email 정보가 없습니다.');
      }

      const hashedPassword = user.password || '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

      if (!isPasswordMatched) {
        throw new Error(' 비밀번호가 일치하지 않습니다.');
      }

      const accessToken = jwt.sign(
        { userEmail: user.email },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.JWT.ACCESS_TOKEN_EXPIRES_IN,
        }
      );

      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error('예기치 못한 에러 발생, 관리자에게 문의하십시오.');
    }
  };
}
