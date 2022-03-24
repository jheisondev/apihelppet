import { client } from '../../../../prisma/client'

interface ILikeRequest {
  idPet: string;
  idUser: string;
}

class CreateLikeUseCase {
  async execute({ idPet, idUser }: ILikeRequest) {
    //verificar se o pet existe
    const petAlreadyExists = await client.pet.findFirst({
      where: {
        id: idPet,
      }
    });

    if (!petAlreadyExists) {
      throw new Error("Comments already exists!");
    }

    //verificar se usuario já deu like
    const userLikeAlreadyExists = await client.like.findFirst({
      where: {
        userId: idUser,
      }
    });

    if (!userLikeAlreadyExists) {
      // Cadastra o like
      const createLike = await client.like.create({
        data: {
          petId: idPet,
          userId: idUser,
        }
      });

      return createLike;
    } else {
      const removeLike = await client.like.delete({
        where: {
          id: userLikeAlreadyExists.id,
        }
      });

      return removeLike;
    }

  }
}

export { CreateLikeUseCase }
