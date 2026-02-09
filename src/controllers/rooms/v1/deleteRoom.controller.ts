import { Request, Response } from "express";
import {RoomService} from "../../../services/roomService.js";
import {ApiError} from "../../../utils/errors.js";

export const deleteRoomController = async (req: Request<{ id: string }>, res: Response) => {
  const { id: roomId } = req.params;

  const data = await RoomService.deleteRoom(roomId);
  if (!data) {
    throw new ApiError("NOT_FOUND");
  }

  return res.status(200).json({
    success: true,
    message: "Room deleted successfully",
  })

}