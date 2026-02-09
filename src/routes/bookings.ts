import { Router } from "express";
import {createBookingController, deleteBookingController, getBookings, getBookingById, updateBookingController} from "../controllers/bookings/v1/index.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {paginate} from "../middlewares/paginate.js";
import {validateId} from "../middlewares/validateId.js";

export const bookingRouter = Router();

bookingRouter.post('/', authMiddleware, createBookingController);
bookingRouter.get('/', authMiddleware, paginate, getBookings);
bookingRouter.get('/:id', validateId, authMiddleware, getBookingById);
bookingRouter.patch('/:id', validateId, authMiddleware, updateBookingController);
bookingRouter.delete('/:id', validateId, authMiddleware, deleteBookingController);

