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
      const sitterOrNormal = req.user;
      if (!sitterOrNormal) {
        const errors = new Error("존재하지 않는 유저입니다.");
        errors.statusCode = 404;
        throw errors;
      }
      const userId = sitterOrNormal.userId;

      if (sitterOrNormal.role === "normal") {
        const { password, newPassword, rePassword } = req.body;

        if (!password) {
          const errors = new Error("입력란을 확인해주세요.");
          errors.statusCode = 404;
          throw errors;
        }

        if (newPassword !== rePassword) {
          const errors = new Error("변경할 비밀번호를 확인해주세요.");
        errors.statusCode = 404;
        throw errors;
        }
        const user = await this.userService.updatedNormalUser(
          userId,
          password,
          newPassword
        );
        const updatedUser = {
          userId: user.userId,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt
        }

        res.status(200).json({
          updatedUser,
          message: "수정에 성공하였습니다.",
        });
      } else if (sitterOrNormal.role === "sitter") {
        const { career, name, password, newPassword, rePassword } = req.body;

        if (!password) {
          const errors = new Error("입력란을 확인해주세요.");
          errors.statusCode = 404;
          throw errors;
        }

        if (newPassword !== rePassword) {
          const errors = new Error("변경할 비밀번호를 확인해주세요.");
        errors.statusCode = 404;
        throw errors;
        }

        const user = await this.userService.updatedSitterUser(
          userId,
          career,
          name,
          password,
          newPassword
        );

        const updatedUser = {
          userId: user.userId,
          email: user.email,
          role: user.role,
          career: user.sitters.career,
          name: user.sitters.name,
          createdAt: user.createdAt
        }
        res.status(200).json({
          updatedUser,
          message: "수정에 성공하였습니다.",
        });
      }
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

  //   // 시터 유저 정보 삭제
  //   deleteUser = async (req, res, next) => {
  //     try {
  //       const sitter = req.user;
  //       if (!sitter) {
  //         const errors = new Error('존재하지 않는 유저입니다.');
  //         errors.statusCode = 404;
  //         throw errors;
  //       }
  //       const sitterId = sitter.sitterId;
  //       const user = await this.userService.deletedUser(sitterId);
  //
  //       res.status(200).json({
  //         user,
  //         message: '삭제에 성공하였습니다.',
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       if (err.statusCode) {
  //         return res.status(err.statusCode).json({ message: err.message });
  //       }
  //       res.status(500).json({
  //         message: '서버 에러입니다.',
  //       });
  //     }
  //   };
}
