import { client } from '../../../../prisma/client'

interface IPetRequest {
  name: string;
  uf: string;
  city: string;
  dateBirth: Date;
  bio: string;
  size: string;
  gender: string;
  adoptionStatus: boolean;
  photos: [''];
  idUser: string;
}

class CreatePetUseCase {
  async execute({
    name,
    uf,
    city,
    dateBirth,
    bio,
    size,
    gender,
    adoptionStatus,
    photos,
    idUser
  }: IPetRequest) {
    //verificar se usuario existe
    const userAlreadyExists = await client.user.findUnique({
      where: {
        id: idUser,
      }
    });

    if (!userAlreadyExists) {
      throw new Error("User already exists!");
    }

    // Cadastra o pet
    const pet = await client.pet.create({
      data: {
        name,
        uf,
        city,
        dateBirth,
        bio,
        size,
        gender,
        adoptionStatus,
        photos,
        userId: idUser,
      }
    });

    return pet;
  }
}

export { CreatePetUseCase }
