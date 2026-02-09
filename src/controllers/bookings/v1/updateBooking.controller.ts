import {Request, Response} from "express";
import {updateBookingSchema} from "../../../validators/booking.schema.js";
import {ApiError} from "../../../utils/errors.js";
import {BookingService} from "../../../services/bookingService.js";
import { z } from "zod";

export const updateBookingController = async (req: Request<{id: string}>, res: Response) => {

  const { id } = req.params;
  const user = req.user!;

  const result = updateBookingSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.prettifyError(result.error));
  }

  const booking = await BookingService.updateBooking(
    id,
    result.data,
    user
  );

  return res.status(200).json({
    success: true,
    message: "Booking updated successfully",
    data: booking,
  });

}

