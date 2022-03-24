import { hash } from 'bcrypt';
import { client } from '../../../../prisma/client'

interface IUserRequest {
  email: string;
  username: string;
  password: string;
}

class CreateUserUseCase {
  async execute({ email, username, password }: IUserRequest) {
    //verificar se usuario existe
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username
      }
    });
    const userEmailAlreadyExists = await client.user.findFirst({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    if (userEmailAlreadyExists) {
      throw new Error("Email already exists!");
    }

    // Cadastra o usuario
    const passwordHash = await hash(password, 8);
    const user = await client.user.create({
      data: {
        email,
        username,
        password: passwordHash,
      }
    });

    return user;
  }
}

export { CreateUserUseCase }
