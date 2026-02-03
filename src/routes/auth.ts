import express from "express";
import { login } from "../controllers/auth/index.js";

const router = express.Router();

router.post('/login', login);


export { router as authRouter };

