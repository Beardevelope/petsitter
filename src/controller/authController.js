import AuthService from '../service/auth.service.js';

export default class AuthController {
  authService = new AuthService();

  signupUser = async (req, res) => {
    try {
      const { email, password, passwordConfirm, userName, petName, petType } =
        req.body;

      if (!email || !password || !passwordConfirm || !userName) {
        throw new Error(
          '이메일, 패스워드, 패스워드 확인, 유저 이름은 필수 입력 항목입니다.'
        );
      }
      const newUser = await this.authService.signup(
        email,
        password,
        passwordConfirm,
        userName,
        petName,
        petType
      );

      return res.status(201).json({
        success: true,
        message: '회원가입 되었습니다',
        data: newUser,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        success: false,
        message: error.message || '서버 문제 발생, 관리자에게 문의하세요.',
      });
    }
  };

  signInUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.signInUser(email, password);

      return res.status(200).json({
        success: true,
        message: '로그인 성공',
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '서버 문제 발생, 관리자에게 문의하세요.',
      });
    }
  };
}
