import { Router } from "express";
import {createBookingController, deleteBookingController, getBookings, updateBookingController} from "../controllers/bookings/index.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {paginate} from "../middlewares/paginate.js";
import {getBookingById} from "../controllers/bookings/getBookingById.controller.js";

export const bookingRouter = Router();

bookingRouter.post('/', authMiddleware, createBookingController);
bookingRouter.get('/', authMiddleware, paginate, getBookings);
bookingRouter.get('/:id', authMiddleware, getBookingById);
bookingRouter.patch('/:id', authMiddleware, updateBookingController);
bookingRouter.delete('/:id', authMiddleware, deleteBookingController);

