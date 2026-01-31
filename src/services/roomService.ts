import { Room } from "../models/index.js";
import { createRoomSchema } from "../validators/room.schema.js";
import {z} from "zod";
import { RoomDocument } from "../models/Room.model.js";

type CreateRoomPayload = z.infer<typeof createRoomSchema>;

export class RoomService {
  // TODO: Add pagination
  static async getRooms(): Promise<RoomDocument[]> {
    const rooms = await Room.find();

    return rooms;
  }

  static async createRoom(payload: CreateRoomPayload): Promise<RoomDocument> {
    const createdRoom = await Room.create(payload);
    return createdRoom;
  }
}