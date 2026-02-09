import { Request, Response } from "express";
import {BookingService} from "../../../services/bookingService.js";
import {parseSort} from "../../../utils/sortParser.js";
import {USER_ROLES} from "../../../models/Employee.model.js";
import mongoose from "mongoose";

export const getBookings = async(req: Request, res: Response) => {
  const { sort = {}, year, employeeId } = req.query as any;
  const user = req.user!;

  const filters: any = {};

  if (user.role !== USER_ROLES.Admin) {
    filters.employee = new mongoose.Types.ObjectId(user.id);
  } else if (employeeId) {
    filters.employee = new mongoose.Types.ObjectId(employeeId);
  }

  if (year) {
    const y = Number(year);
    if (Number.isInteger(y)) {
      filters.createdAt = {
        $gte: new Date(`${y}-01-01T00:00:00.000Z`),
        $lt: new Date(`${y + 1}-01-01T00:00:00.000Z`),
      };
    }
  }

  const sortQuery = parseSort({
    customSort: sort,
    allowed: ["createdAt", "date"] as const,
    defaultSort: {
      createdAt: -1,
      _id: -1,
    },
  });

  const {data, pagination} = await BookingService.getBookings({
    pagination: (req as any).paginate,
    filters,
    sort: sortQuery
  });

  return res.status(200).json({
    success: true,
    message: "Fetched room bookings successfully",
    data,
    pagination
  })

}