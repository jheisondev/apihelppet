import { Router } from "express";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./modules/account/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/account/useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "./modules/account/useCases/refreshTokenUser/RefreshTokenUserController";

import { CreatePetController } from "./modules/pets/useCases/createPet/CreatePetController";
import { CreateCommentsController } from "./modules/pets/useCases/createComments/CreateCommentsController";
import { RemoveCommentsController } from "./modules/pets/useCases/removeComments/RemoveCommentsController";
import { CreateLikesController } from "./modules/pets/useCases/createLike/CreateLikeController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();
const createPetController = new CreatePetController();
const createCommentsController = new CreateCommentsController();
const removeCommentsController = new RemoveCommentsController();
const createLikesController = new CreateLikesController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenUserController.handle);

router.post('/pets', createPetController.handle);
router.post('/pets/comment', createCommentsController.handle);
router.post('/pets/comment/remove', removeCommentsController.handle);
router.post('/pets/like', createLikesController.handle);

router.get('/user', (request, response) => {
  return response.json([
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
    },
    {
      id: 3,
      name: '3',
    },
    {
      id: 4,
      name: '4',
    },
  ])
});

export { router };
