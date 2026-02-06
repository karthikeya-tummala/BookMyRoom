import { Request, Response } from "express";
import { BookingService } from "../../services/bookingService.js";

export const deleteBookingController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  const user = req.user!;

  await BookingService.deleteBooking(id, {
    id: user.id,
    role: user.role,
  });

  return res.status(200).json({
    success: true,
    message: "Deleted Booking successfully"
  });
};
