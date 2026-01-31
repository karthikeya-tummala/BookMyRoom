import { Request, Response} from "express";
import {createRoomSchema} from "../../validators/room.schema.js";
import {ApiError} from "../../utils/errors.js";
import {z} from "zod";
import {RoomService} from "../../services/roomService.js";

export const createRoom = async (req: Request, res: Response) => {
  const result = createRoomSchema.safeParse(req.body);

  if (!result.success) {
    throw new ApiError("VALIDATION_ERROR", z.treeifyError(result.error));
  }

  const createdRoom = await RoomService.createRoom(result.data);

  return res.status(201).json({
    success: true,
    data: createdRoom

  });
}