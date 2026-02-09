import { Request, Response } from "express";
import { updateRoomSchema } from "../../../validators/room.schema.js";
import { ApiError } from "../../../utils/errors.js";
import {z} from "zod";
import {RoomService} from "../../../services/roomService.js";

export const updateRoomController = async (req: Request<{ id: string }>, res: Response) => {
  const result = updateRoomSchema.safeParse(req.body);
  const { id } = req.params;

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.prettifyError(result.error));
  }

  const data = await RoomService.updateRoom(id, result.data);

  return res.status(200).json({
    success: true,
    message: "Room details updated successfully",
    data
  })

}