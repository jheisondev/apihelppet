import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { client } from "../../../../prisma/client";
import { GenerateRefreshToken } from "../../../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../../../provider/GenerateTokenProvider";

interface iRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: iRequest) {
    // Verificar se usuário exite
    const userAlreadyExists = await client.user.findFirst({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error("Usuario não encontrado!");
    }

    // Verificar se a senha esta correta
    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error("Usuario ou senha incorretos!");
    }

    const { id, username } = userAlreadyExists;

    // Gerar token do usuário
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(id);

    await client.refreshToken.deleteMany({
      where: {
        userId: id
      }
    });

    const generateRefreshToken = new GenerateRefreshToken();

    const refreshToken = await generateRefreshToken.execute(id);

    return {
      token,
      refreshToken,
      id,
      email,
      username,
    };
  }
}

export { AuthenticateUserUseCase }
