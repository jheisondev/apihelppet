import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: 'Token inválido!'
    })
  }


  const [, token] = authToken.split(" ");

  try {
    verify(token, "3f8b7ce5-35af-4475-a7c4-4b6de5a7de6d");
    return next();
  } catch (err) {
    return response.status(401).json({
      message: "Token inválido!"
    })
  }
}
