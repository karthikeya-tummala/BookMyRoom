import { Request, Response } from "express";
import { BookingService } from "../../services/bookingService.js";
import {ApiError} from "../../utils/errors.js";

export const getBookingById = async (
  req: Request<{id: string}>,
  res: Response
) => {

  if (!req.user) {
    throw new ApiError("INVALID_CREDENTIALS");
  }

  const booking = await BookingService.getById(
    req.params.id,
    {
      id: req.user.id,
      role: req.user.role,
    }
    );

  return res.status(200).json({
    success: true,
    data: booking,
  });
};
