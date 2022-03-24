import { client } from '../../../../prisma/client'

interface ICommentRequest {
  idComment: string;
  idUser: string;
}

class RemoveCommentsUseCase {
  async execute({ idComment, idUser }: ICommentRequest) {
    //verificar se comentário existe
    const commentAlreadyExists = await client.comment.findFirst({
      where: {
        id: idComment,
        userId: idUser,
      }
    });

    if (!commentAlreadyExists) {
      throw new Error("Comment already exists!");
    }

    // Deleta o comentário
    const deleteComment = await client.comment.delete({
      where: {
        id: commentAlreadyExists.id,
      }
    });

    return deleteComment;
  }
}

export { RemoveCommentsUseCase }
