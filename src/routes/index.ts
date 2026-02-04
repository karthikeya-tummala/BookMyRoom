import { Router } from "express";
import { authRouter } from "./auth.js";
import { roomRouter } from './rooms.js';
import { employeeRouter } from "./employees.js";
import { bookingRouter } from "./bookings.js";

export const router = Router();

// TODO: API Versioning

router.use('/auth', authRouter);
router.use('/rooms', roomRouter);
router.use('/employees', employeeRouter);
router.use('/bookings', bookingRouter);

