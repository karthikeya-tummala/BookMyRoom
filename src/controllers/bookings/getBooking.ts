import { Request, Response } from "express";
import {BookingService} from "../../services/bookingService.js";

export const getBookings = async(req: Request, res: Response) => {

  const booking = await BookingService.getBookings();

  return res.status(200).json({
    success: true,
    message: "Fetched room bookings successfully",
    data: booking
  })

}