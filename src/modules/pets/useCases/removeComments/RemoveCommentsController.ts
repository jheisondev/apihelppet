import { Request, Response } from 'express';
import { RemoveCommentsUseCase } from './RemoveCommentsUseCase';

class RemoveCommentsController {

  async handle(request: Request, response: Response) {
    const { idComment, idUser } = request.body;

    const removeCommentsUseCase = new RemoveCommentsUseCase();

    const removeComment = await removeCommentsUseCase.execute({
      idComment,
      idUser
    });

    return response.json(removeComment);
  }
}

export { RemoveCommentsController }
