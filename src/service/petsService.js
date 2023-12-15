import PetsRepository from '../repository/petsRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class PetsService {
  petsRepository = new PetsRepository();

  // 전체 펫 리스트 조회하기
  getAllMyPets = async (userId) => {
    const pet = await this.petsRepository.getAllMyPets(userId);
    if (pet.length === 0) throw new Error('등록한 반려동물이 없습니다.');
    return pet;
  };

  // 펫 등록 기능
  registerService = async ({ userId, petName, petType }) => {
    console.log(userId);
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

  deletePet = async (userId, petId) => {
    const user = await this.petsRepository.findUserById(userId);
    if (user.userId !== userId) throw new Error('삭제 권한이 없는 유저입니다.');

    await this.petsRepository.deleteUser(userId, petId);

    const deleteUser = await this.petsRepository.findUserById(userId);

    return deleteUser;
  };
}
