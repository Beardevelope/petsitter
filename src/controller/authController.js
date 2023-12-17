import { AuthService } from "../service/authService.js";

export class AuthController {
  authService = new AuthService();

  //회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, role, career, name, password, rePassword } = req.body;
      if (!email || !role || !career || !name || !password || !rePassword) {
        const errors = new Error("입력란을 확인해주세요.");
        errors.statusCode = 400;
        throw errors;
      }
      const userType = { normal: "normal", sitter: "sitter" };

      // 프론트에서 어떻게 나타낼지 고민좀.. 버튼으로? 아니면 입력으로..
      if (!Object.values(userType).includes(role)) {
        const errors = new Error("일반과 시터로만 입력해주세요");
        errors.statusCode = 400;
        throw errors;
      }
      // 일반유저인 경우
      if (role === "normal") {
        const user = await this.authService.signUpNormalUser(
          email,
          role,
          password,
          rePassword
        );
        return res.status(201).json({ user });
      }

      const user = await this.authService.signUpSitterUser(
        email,
        role,
        career,
        name,
        password,
        rePassword
      );

      res.status(201).json({ user });
    } catch (err) {
      console.error(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  };

  // 로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "입력란을 확인해주세요" });
      }

      const user = await this.authService.signInUser(email, password);

      res.cookie("Authorization", user, { maxAge: 360000 });
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  };
}
