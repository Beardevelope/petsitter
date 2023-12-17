import { UserService } from "../service/userService.js";

export class UserController {
  userService = new UserService();

  // 시터 전체 목록 조회
  getSitterUSers = async (req, res, next) => {
    try {
      const users = await this.userService.findAllSitterUser();

      res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  };

  // 시터 상세 조회
  getSitterUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await this.userService.findOneSitterUser(id);

      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  };

  // 시터 유저 내정보 조회
  userInfo = async (req, res, next) => {
    try {
      const user = req.user;
      if (user == null) {
        const errors = new Error("존재하지 않는 유저입니다.");
        errors.statusCode = 404;
        throw errors;
      }
      res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  };

  // 유저 정보 수정
  putUser = async (req, res, next) => {
    try {
      const { userId, role } = req.user;
      const { career, name, password, passwordCheck } = req.body;
      const updateUser = await this.userService.updateUser(userId,
        password,
        passwordCheck)
      if (updateUser.role == "sitter") {
        console.log(updateUser)
        await this.userService.updatedSitterUser(
          userId,
          career,
          name
        );

      }
      res.status(200).json({
        message: "정보가 수정되었습니다.",
        data: updateUser
      });
    } catch (err) {
      if (err.statusCode) {
        console.log("err.status, err.message", err.statusCode, err.message)
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: "서버 에러입니다.",
      });
    }
  }
};
