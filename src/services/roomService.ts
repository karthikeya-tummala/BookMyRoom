import { Room } from "../models/index.js";
import { createRoomSchema } from "../validators/room.schema.js";
import {z} from "zod";
import { RoomType } from "../models/Room.model.js";
import {ApiError} from "../utils/errors.js";

type CreateRoomPayload = z.infer<typeof createRoomSchema>;

export class RoomService {

  static async getRooms({ pagination, filters, sort }: any) {
    const query = filters ?? {};
    const { page, limit, skip } = pagination;

    const [result] = await Room.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
          ],
          metadata: [
            { $count: 'totalDocuments' },
          ],
        },
      },
    ]);

    const totalDocuments = result.metadata[0]?.totalDocuments ?? 0;
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      data: result.data,
      pagination: {
        currentPage: page,
        totalDocuments,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  static async getById(id: string) {
    const room = await Room.findById(id);

    if (!room) {
      throw new ApiError("NOT_FOUND");
    }

    return room;
  }

  static async createRoom(payload: CreateRoomPayload) {
    const createdRoom = await Room.create(payload);
    return createdRoom;
  }

  static async updateRoom(id: string, payload: Partial<RoomType>) {
    const room = await Room.findByIdAndUpdate(id, {$set: payload}, { new: true });

    if (!room) {
      throw new ApiError("NOT_FOUND");
    }

    return room;
  }

  static async deleteRoom(id: string) {
    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      throw new ApiError("NOT_FOUND");
    }

    return room;
  }
}