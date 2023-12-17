import PetsRepository from '../repository/petsRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class PetsService {
  petsRepository = new PetsRepository();

  // 전체 펫 리스트 조회하기
  getAllMyPets = async (userId) => {
    const pet = await this.petsRepository.getAllMyPets(userId);
    return pet;
  };

  // 펫 등록 기능
  registerService = async ({ userId, petName, petType }) => {
    const pet = await this.petsRepository.registerPet({
      userId,
      petName,
      petType,
    });
    return pet;
  };

  // 펫 정보 수정

  updatedPet = async (userId, petId, petName, petType) => {
    const user = await this.petsRepository.findUserById(userId);
    console.log(userId);
    if (user.userId !== userId) throw Error('수정 권한이 없는 유저입니다.');

    await this.petsRepository.updatepet(userId, petId, petName, petType);

    const updateUser = await this.petsRepository.findUserById(userId);
    return updateUser;
  };

  // 펫 정보 삭제

  deletePet = async (petId) => {
    return await this.petsRepository.deleteUser(petId);
  };
}
