import { Request, Response } from "express";
import { RoomService } from "../../services/roomService.js";

export const getRooms = async (req: Request, res: Response) => {

  const rooms = await RoomService.getRooms();
  return res.status(200).json({
    success: true,
    message: "Fetched all rooms successfully",
    data: rooms,
  });
}