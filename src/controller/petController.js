import UserService from '../service/userService.js';

export default class UserController {
  userService = new UserService();

  // 전체 유저 조회

  getAllUsers = async (req, res) => {
    try {
      const user = await this.userService.getAllUser();
      res.status(200).json({
        success: true,
        message: ' 유저 정보 조회 성공',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '에러가 발생하였으니, 관리자에게 문의 부탁드립니다.',
      });
    }
  };

  // 내 정보 조회
  getUserOfMe = (req, res) => {
    res.json({
      userEemail: req.user.userEmail,
      userName: req.user.userName,
      petName: req.user.petName,
      petType: req.user.petTpye,
    });
  };

  // 유저 정보 수정

  putUser = async (req, res) => {
    try {
      const { userId, password, userName, petName, petType } = req.body;

      const user = await this.userService.updatedUser(
        userId,
        userName,
        password,
        petName,
        petType
      );
      res.send(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '에러가 발생하였으니, 관리자에게 문의 부탁드립니다.',
      });
    }
  };
}
