import { Request, Response } from 'express';
import { CreateCommentsUseCase } from './CreateCommentsUseCase';

class CreateCommentsController {

  async handle(request: Request, response: Response) {
    const { comment, idPet, idUser } = request.body;

    const createCommentsUseCase = new CreateCommentsUseCase();

    const auxComment = await createCommentsUseCase.execute({
      comment,
      idPet,
      idUser
    });

    return response.json(auxComment);
  }
}

export { CreateCommentsController }
