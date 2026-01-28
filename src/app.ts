import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import { router } from './routes/index.js';

dotenv.config();

export const app: Application = express();

app.use(express.json());

app.use(router);

app.get('/health', (_req, res) => {
  res.json({
    status: 'Online',
    health: 'Bad'
  });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);

  return res.status(500).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

