import {Booking, Room} from "../models/index.js";
import {createRoomSchema} from "../validators/room.schema.js";
import {z} from "zod";
import {RoomType} from "../models/Room.model.js";
import {ApiError} from "../utils/errors.js";
import mongoose from "mongoose";

type CreateRoomPayload = z.infer<typeof createRoomSchema>;

export class RoomService {
  // TODO: Design DTO

  static async getRooms({pagination, filters, sort}: any): Promise<{
    data: RoomType[];
    pagination: {
      currentPage: number;
      totalDocuments: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> {
    const query = filters ?? {};
    const {page, limit, skip} = pagination;

    const [result] = await Room.aggregate([
      {$match: query},
      {$sort: sort},
      {
        $facet: {
          data: [
            {$skip: skip},
            {$limit: limit},
          ],
          metadata: [
            {$count: 'totalDocuments'},
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

  static async getAvailableRooms({pagination, filters, sort, date, startTime, endTime}: any): Promise<{
    data: RoomType[];
    pagination: {
      currentPage: number;
      totalDocuments: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const bookingDate = new Date(date);
    bookingDate.setUTCHours(0, 0, 0, 0);

    const conflictingRoomIds = await Booking.distinct("room", {
      date: bookingDate,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    const [rooms, totalDocuments] = await Promise.all([
      Room.find({
        ...(filters ?? {}),
        _id: { $nin: conflictingRoomIds },
      })
      .sort(sort)
      .skip(pagination.skip)
      .limit(pagination.limit),

      Room.countDocuments({
        ...(filters ?? {}),
        _id: { $nin: conflictingRoomIds },
      }),
    ]);

    const totalPages = Math.ceil(totalDocuments / pagination.limit);

    return {
      data: rooms,
      pagination: {
        currentPage: pagination.page,
        totalDocuments,
        totalPages,
        hasNextPage: pagination.page < totalPages,
        hasPrevPage: pagination.page > 1,
      },
    };
  }

  static async getById(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("VALIDATION_ERROR");
    }

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("VALIDATION_ERROR");
    }

    const room = await Room.findByIdAndUpdate(id, {$set: payload}, {new: true});

    if (!room) {
      throw new ApiError("NOT_FOUND");
    }

    return room;
  }

  static async deleteRoom(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("VALIDATION_ERROR");
    }

    const room = await Room.findByIdAndDelete(id);

    if (!room) {
      throw new ApiError("NOT_FOUND");
    }

    return room;
  }
}