import { client } from '../../../../prisma/client'

interface ICommentRequest {
  comment: string;
  idPet: string;
  idUser: string;
}

class CreateCommentsUseCase {
  async execute({ comment, idPet, idUser }: ICommentRequest) {
    //verificar se usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        id: idUser,
      }
    });

    //verificar se o pet existe
    const petAlreadyExists = await client.pet.findFirst({
      where: {
        id: idPet,
      }
    });

    if (!userAlreadyExists) {
      throw new Error("User already exists!");
    }

    if (!petAlreadyExists) {
      throw new Error("Comments already exists!");
    }

    // Cadastra o comentario
    const auxComment = await client.comment.create({
      data: {
        comment,
        petId: idPet,
        userId: idUser,
      }
    });

    return auxComment;
  }
}

export { CreateCommentsUseCase }
