import { Request, Response } from 'express';
import { CreateLikeUseCase } from './CreateLikeUseCase';

class CreateLikesController {

  async handle(request: Request, response: Response) {
    const { idPet, idUser } = request.body;

    const createLikeUseCase = new CreateLikeUseCase();

    const auxComment = await createLikeUseCase.execute({
      idPet,
      idUser
    });

    return response.json(auxComment);
  }
}

export { CreateLikesController }
