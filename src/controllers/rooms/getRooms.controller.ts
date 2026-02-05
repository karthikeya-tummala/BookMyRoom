import { Request, Response } from "express";
import { RoomService } from "../../services/roomService.js";
import {parseSort} from "../../utils/sortParser.js";
import {escapeRegex} from "../../utils/escapeRegex.js";
import {FilterOp, RoomQuery} from "../../validators/room.query.js";


export const getRoomsController = async (req: Request, res: Response) => {

  const {
    sort = {},
    filter = {},
    search,
    date: date_of_booking,
    startTime,
    endTime
  } = req.query as RoomQuery;

  const filters: any = {};
  const allowedOps: FilterOp[] = ["gt", "gte", "lt", "lte", "eq"];

  for (const field of ["floor", "capacity"] as const) {
    const fieldFilter = filter[field];
    if (!fieldFilter) continue;

    for (const op of allowedOps) {
      const rawValue = fieldFilter[op];
      if (!rawValue) continue;

      const value = Number(rawValue);
      if (!Number.isFinite(value)) continue;

      if (op === "eq") {
        filters[field] = value;
      } else {
        filters[field] ??= {};
        filters[field][`$${op}`] = value;
      }
    }
  }

  if (search) {
    filters.name = { $regex: escapeRegex(search), $options: "i" };
  }

  const sortQuery = parseSort({
    customSort: sort,
    allowed: ["floor", "capacity"] as const,
    defaultSort: {
      floor: 1,
      capacity: 1,
      _id: -1,
    },
  });

  if (date_of_booking && startTime && endTime) {
    const date = new Date(date_of_booking);
    const start = new Date(startTime);
    const end = new Date(endTime);

    const rooms = await RoomService.getAvailableRooms({
      pagination: (req as any).paginate,
      filters,
      sort: sortQuery,
      date,
      startTime: start,
      endTime: end
    })

    return res.status(200).json({
      success: true,
      message: "Fetched available rooms successfully",
      data: rooms.data,
      pagination: rooms.pagination
    })
  }

  const rooms = await RoomService.getRooms({
    pagination: (req as any).paginate,
    filters,
    sort: sortQuery
  });

  return res.status(200).json({
    success: true,
    message: "Fetched all rooms successfully",
    data: rooms.data,
    pagination: rooms.pagination
  });
};