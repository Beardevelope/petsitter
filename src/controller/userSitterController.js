import { UserService } from '../service/userSitterService.js';

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
        message: '서버 에러입니다.',
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
        message: '서버 에러입니다.',
      });
    }
  };

  // 시터 유저 내정보 조회
  sitterInfo = async (req, res, next) => {
    try {
      const user = req.user;
      if (user == null) {
        const errors = new Error('존재하지 않는 유저입니다.');
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
        message: '서버 에러입니다.',
      });
    }
  };

  // 시터 유저 정보 수정
  putUser = async (req, res, next) => {
    try {
      const sitter = req.user;
      if (!sitter) {
        const errors = new Error('존재하지 않는 유저입니다.');
        errors.statusCode = 404;
        throw errors;
      }
      const sitterId = sitter.sitterId;

      const { sitterName, career } = req.body;
      if (!sitterName || !career) {
        const errors = new Error('입력란을 확인해주세요.');
        errors.statusCode = 400;
        throw errors;
      }

      const user = await this.userService.updatedUser(
        sitterId,
        sitterName,
        career,
      );

      res.status(200).json({
        user,
        message: '수정에 성공하였습니다.',
      });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: '서버 에러입니다.',
      });
    }
  };

  // 시터 유저 정보 삭제
  deleteUser = async (req, res, next) => {
    try {
      const sitter = req.user;
      if (!sitter) {
        const errors = new Error('존재하지 않는 유저입니다.');
        errors.statusCode = 404;
        throw errors;
      }
      const sitterId = sitter.sitterId;
      const user = await this.userService.deletedUser(sitterId);

      res.status(200).json({
        user,
        message: '삭제에 성공하였습니다.',
      });
    } catch (err) {
      console.log(err);
      if (err.statusCode) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      res.status(500).json({
        message: '서버 에러입니다.',
      });
    }
  };
}
