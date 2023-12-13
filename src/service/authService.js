import AuthRepository from '../repository/authRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class AuthService {
  authRepository = new AuthRepository();
  signupUser = async (
    userEmail,
    password,
    passwordConfirm,
    userName,
    petName,
    petType
  ) => {
    if (password !== passwordConfirm) {
      throw new Error('입력한 비밀번호가 서로 일치하지 않습니다.');
    }

    if (!userName) {
      throw new Error(' 사용자 이름은 필수 기재 사항입니다.');
    }
    if (password.length < 6) {
      throw new Error('비밀번호는 최소 6자리 이상이어야 합니다.');
    }

    const existedUser = await this.authRepository.findUserByEmail(userEmail);
    if (existedUser) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
    const isValidEmail = emailValidationRegex.test(userEmail);
    if (!isValidEmail) {
      throw new Error('이메일 형식이 맞지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = await this.authRepository.createUser({
      userEmail,
      password: hashedPassword,
      userName,
      petName,
      petType,
    });

    return newUser;
  };

  signInUser = async (userEmail, password) => {
    try {
      if (!userEmail || !password) {
        throw new Error('이메일과 비밀번호 입력은 필수 사항입니다.');
      }
      const user = await this.authRepository.findUserByEmail(userEmail);

      if (!user) {
        throw new Error('일치하는 email 정보가 없습니다.');
      }

      const hashedPassword = user.password || '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

      if (!isPasswordMatched) {
        throw new Error(' 비밀번호가 일치하지 않습니다.');
      }

      const accessToken = jwt.sign(
        { userEmail: user.userEmail },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        }
      );

      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error('예기치 못한 에러 발생, 관리자에게 문의하십시오.');
    }
  };
}
