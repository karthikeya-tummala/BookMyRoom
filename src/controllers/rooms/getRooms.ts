import { Request, Response } from "express";
import { RoomService } from "../../services/roomService.js";

export const getRooms = async (req: Request, res: Response) => {
  const { page, limit, sort, order, ...filters } = req.query as any;

  const ALLOWED_SORT_FIELDS = new Set(['floor', 'capacity']);

  let sortQuery: Record<string, 1 | -1> = {
    floor: 1,
    capacity: 1,
    _id: 1,
  };

  if (ALLOWED_SORT_FIELDS.has(sort)) {
    sortQuery = {
      [sort]: order === 'desc' ? -1 : 1,
      _id: 1,
    };
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