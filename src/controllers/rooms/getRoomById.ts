import { Request, Response } from "express";
import { RoomService } from "../../services/roomService.js";

type Params = { id: string };

export const getRoomById = async (
  req: Request<Params>,
  res: Response
) => {
  const room = await RoomService.getById(req.params.id);

  return res.status(200).json({
    success: true,
    data: room,
  });
};
