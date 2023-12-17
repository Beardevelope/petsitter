import { prisma } from '../utils/prisma/index.js';

export default class PetsRepository {
  // 내 펫 리스트 조회
  getAllMyPets = async (userId) => {
    const pet = await prisma.pets.findMany({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        petId: true,
        petName: true,
        petType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return pet;
  };

  // 내 펫 등록

  registerPet = async ({ userId, petType, petName }) => {
    const createPet = await prisma.pets.create({
      data: {
        userId: userId,
        petType: petType,
        petName: petName,
      },
    });
    return createPet;
  };

  // Pet 정보 수정
  updatepet = async (userId, petId, petName, petType) => {
    const updatedPet = await prisma.pets.update({
      where: {
        petId: +petId,
      },
      data: {
        userId: +userId,
        petName: petName,
        petType: petType,
      },
    });
    console.log(updatedPet);
    return updatedPet;
  };

  // userId를 통한 유저 찾기
  findUserById = async (userId) => {
    const user = await prisma.pets.findFirst({
      where: {
        userId: +userId,
      },
    });
    return user;
  };
  // pet 삭제

  deleteUser = async (petId) => {
    const deletePet = await prisma.pets.delete({
      where: { petId },
    });
    return deletePet;
  };
}
