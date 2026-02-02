import { Room } from "../models/index.js";
import { createRoomSchema } from "../validators/room.schema.js";
import {z} from "zod";
import { RoomType } from "../models/Room.model.js";
import {Mongoose} from "mongoose";

type CreateRoomPayload = z.infer<typeof createRoomSchema>;

export class RoomService {
  // TODO: Add pagination
  static async getRooms(): Promise<RoomType[]> {
    const rooms = await Room.find();

    return rooms;
  }

  static async createRoom(payload: CreateRoomPayload): Promise<RoomType> {
    const createdRoom = await Room.create(payload);
    return createdRoom;
  }

  static async updateRoom(id: string, payload: Partial<RoomType>): Promise<RoomType | null> {
    const room = await Room.findByIdAndUpdate(id, {$set: payload}, { new: true });
    return room;
  }

  static async deleteRoom(id: string) {
    const room = await Room.findByIdAndDelete(id);
    return room;
  }
}