import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

  if (error instanceof Error) {
    return response.status(400).json({
      status: 'Error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

app.listen(8000, () => console.log("Server is running 🔥 port 8000"))
