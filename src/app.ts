import express, { Application, Request, Response, NextFunction } from 'express';
import { router } from './routes/index.js';
import {ApiError, ERROR_CODES} from "./utils/errors.js";


export const app: Application = express();

app.set("query parser", "extended");
app.use(express.json());

app.use(router);

app.get('/health', (_req, res) => {
  res.json({
    status: 'Online',
    health: 'Bad'
  });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError("NOT_FOUND"));
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.errorType,
      message: err.message,
      errors: err.errors
    });
  }

  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  console.error(err);
  return res.status(ERROR_CODES.INTERNAL.status).json({
    success: false,
    message: ERROR_CODES.INTERNAL.message
  });
});

