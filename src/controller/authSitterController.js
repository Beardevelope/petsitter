import { AuthService } from '../service/authSitterService.js';

export class AuthController {
  authService = new AuthService();

  signUp = async (req, res, next) => {
    try {
      const {
        sitterEmail,
        sitterName,
        nickName,
        career,
        password,
        Repassword,
      } = req.body;
      if (
        !sitterEmail ||
        !sitterName ||
        !nickName ||
        !career ||
        !password ||
        !Repassword
      ) {
        const errors = new Error('입력란을 확인해주세요.');
        errors.statusCode = 400;
        throw errors;
      }

      const user = await this.authService.signUpUser(
        sitterEmail,
        sitterName,
        nickName,
        career,
        password,
        Repassword
      );

      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: '서버 에러입니다.',
      });
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { sitterEmail, password } = req.body;
      if (!sitterEmail || !password) {
        return res.status(400).json({ message: '입력란을 확인해주세요' });
      }

      const user = await this.authService.signInUser(sitterEmail, password);

      res.cookie('Authorization', user, { maxAge: 360000 });
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: '서버 에러입니다.',
      });
    }
  };
}
