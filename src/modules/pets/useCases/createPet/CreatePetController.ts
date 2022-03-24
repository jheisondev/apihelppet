import { Request, Response } from 'express';
import { CreatePetUseCase } from './CreatePetUseCase';

class CreatePetController {

  async handle(request: Request, response: Response) {
    const {
      name,
      uf,
      city,
      dateBirth,
      bio,
      size,
      gender,
      adoptionStatus,
      photos,
      idUser,
    } = request.body;

    const createPetUseCase = new CreatePetUseCase();

    const pet = await createPetUseCase.execute({
      name,
      uf,
      city,
      dateBirth,
      bio,
      size,
      gender,
      adoptionStatus,
      photos,
      idUser,
    });

    return response.json(pet);
  }
}

export { CreatePetController }
