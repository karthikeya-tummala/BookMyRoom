import express from "express";
import { login } from "../controllers/auth/v1/index.js";

const router = express.Router();

router.post('/login', login);


export { router as authRouter };

