import { Router } from "express";
import {createBooking, getBookings} from "../controllers/bookings/index.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

export const bookingRouter = Router();

bookingRouter.post('/', authMiddleware, createBooking);
bookingRouter.get('/', getBookings);

