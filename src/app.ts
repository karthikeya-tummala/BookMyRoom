import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './routes/index.js';
import {ApiError} from "./utils/errors.js";

export const app: Application = express();

app.use(express.json());

app.use(router);

app.get('/health', (_req, res) => {
  res.json({
    status: 'Online',
    health: 'Bad'
  });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.errorType,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

