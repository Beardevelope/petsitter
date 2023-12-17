import PetsService from '../service/petsService.js';

export default class PetsController {
  petsService = new PetsService();

  // 나의 펫 리스트 조회

  getAllMyPet = async (req, res) => {
    try {
      const userId = req.user.userId;
      const user = await this.petsService.getAllMyPets(userId);
      res.status(200).json({
        success: true,
        message: ' 반려동물 목록 조회 성공',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  // 펫 등록

  registerPet = async (req, res) => {
    try {
      const { petType, petName } = req.body;
      if (!petType || !petName)
        throw new Error('반려동물의 종류와, 이름은 필수 기재 사항입니다.');

      const userId = req.user.userId;

      const pet = await this.petsService.registerService({
        userId: userId,
        petType: petType,
        petName: petName,
      });
      res.status(200).json({
        success: true,
        message: '반려동물 등록 완료!',
        data: pet,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: '에러가 발생하였으니, 관리자에게 문의 부탁드립니다.',
      });
    }
  };

  // 펫 정보 수정

  updatePet = async (req, res) => {
    try {
      const { petName, petType } = req.body;

      const petId = req.params.petId;
      const userId = req.user.userId;

      const updatedPet = await this.petsService.updatedPet(
        userId,
        petId,
        petName,
        petType
      );
      res.send(updatedPet);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '에러가 발생하였으니, 관리자에게 문의 부탁드립니다.',
      });
    }
  };

  // 펫 정보 삭제

  deletePet = async (req, res) => {
    try {
      const { petId } = req.params;
      const pet = await this.petsService.deletePet(Number(petId));
      res.send(pet);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: '에러가 발생하였으니, 관리자에게 문의 부탁드립니다.',
      });
    }
  };
}
