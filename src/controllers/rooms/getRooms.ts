import { Request, Response } from "express";
import { RoomService } from "../../services/roomService.js";

export const getRooms = async (req: Request, res: Response) => {
  const { page, limit, ...filters } = req.query as any;

  const rooms = await RoomService.getRooms({
    pagination: (req as any).paginate,
    filters,
  });

  return res.status(200).json({
    success: true,
    message: "Fetched all rooms successfully",
    data: rooms,
  });
};