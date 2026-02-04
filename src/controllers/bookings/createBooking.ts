import { Request, Response } from "express";
import {createBookingSchema} from "../../validators/booking.schema.js";
import {ApiError} from "../../utils/errors.js";
import {BookingService} from "../../services/bookingService.js";

export const createBooking = async(req: Request, res: Response) => {
  // TODO: Add collision detection

  if (!req.user) {
    throw new ApiError("INVALID_CREDENTIALS");
  }

  const parsed = createBookingSchema.safeParse({
    ...req.body,
    employee: req.user.id
  });

  if (!parsed.success) {
    throw new ApiError("VALIDATION_ERROR");
  }

  const booking = await BookingService.create(parsed.data);

  return res.status(200).json({
    success: true,
    message: "Fetched room bookings successfully",
    data: booking
  })

}