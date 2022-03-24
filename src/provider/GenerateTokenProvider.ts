import { sign } from "jsonwebtoken";


class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, "3f8b7ce5-35af-4475-a7c4-4b6de5a7de6d", {
      subject: userId,
      expiresIn: "1d"
    });

    return token;
  }
}

export { GenerateTokenProvider }
