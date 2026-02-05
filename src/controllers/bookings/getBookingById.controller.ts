import { Request, Response } from "express";
import { BookingService } from "../../services/bookingService.js";

export const getBookingById = async (
  req: Request<{id: string}>,
  res: Response
) => {
  const booking = await BookingService.getById(req.params.id);

  return res.status(200).json({
    success: true,
    data: booking,
  });
};
