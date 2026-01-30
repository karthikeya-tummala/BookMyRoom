import { Router } from "express";
import { authRouter } from "./auth.js";
import { roomRouter } from './rooms.js';

export const router = Router();

// TODO: API Versioning

router.use('/auth', authRouter);
router.use('/rooms', roomRouter);

