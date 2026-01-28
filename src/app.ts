import express, { Application } from 'express';
import dotenv from "dotenv";

dotenv.config();

export const app: Application = express();

app.use(express.json());

app.get('/health', (_req, res) => {
    res.json({
        status: 'Online',
        health: 'Bad'
    });
});

