import {CreateBookingSchema, UpdateBookingSchema} from "../validators/booking.schema.js";
import {Booking} from "../models/index.js";
import {BookingDTO} from "../types/booking.dto.js";
import {ApiError} from "../utils/errors.js";
import {USER_ROLES, UserRole} from "../models/Employee.model.js";

export class BookingService {

  static async create(payload: CreateBookingSchema): Promise<BookingDTO> {
    const { room, date, startTime, endTime } = payload;

    this.validateBookingDateTime(date, startTime, endTime);

    await this.checkCollisions(room, date, startTime, endTime);

    const booking = await Booking.create(payload);

    const populatedBooking = await booking.populate([
      { path: "employee", select: "name role" },
      { path: "room", select: "name floor capacity type amenities" },
    ]);

    return this.toDTO(populatedBooking);
  }

  static async getBookings({pagination, filters, sort}: any): Promise<{
    data: BookingDTO[];
    pagination: {
      currentPage: number;
      totalDocuments: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> {

    const { page, limit, skip } = pagination

    const [result] = await Booking.aggregate([
      { $match: filters },
      { $sort: sort },
      {
        $facet: {
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $lookup: {
                from: "employees",
                localField: "employee",
                foreignField: "_id",
                as: "employee",
              },
            },
            { $unwind: "$employee" },
            {
              $lookup: {
                from: "rooms",
                localField: "room",
                foreignField: "_id",
                as: "room",
              },
            },
            { $unwind: "$room" },
            {
              $project: {
                employee: { name: 1, role: 1 },
                room: {
                  name: 1,
                  floor: 1,
                  capacity: 1,
                  type: 1,
                  amenities: 1,
                },
                date: 1,
                startTime: 1,
                endTime: 1,
                purpose: 1,
              },
            },
          ],
          metadata: [{ $count: "totalDocuments" }],
        },
      },
    ]);

    const totalDocuments = result.metadata[0]?.totalDocuments ?? 0;
    const totalPages = Math.ceil(totalDocuments / limit);

    return {
      data: result.data.map((b: any) => this.toDTO(b)),
      pagination: {
        currentPage: page,
        totalDocuments,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  static async getById(
    id: string,
    user: { id: string; role: UserRole }
  ) {

    const booking = await Booking.findById(id)
    .populate("employee", "name role")
    .populate("room", "name floor capacity type amenities");

    if (!booking) {
      throw new Error("Booking not found");
    }

    const isAdmin = user.role === USER_ROLES.Admin;
    const isOwner = booking.employee._id.toString() === user.id;

    if (!isAdmin && !isOwner) {
      throw new ApiError("FORBIDDEN");
    }

    return this.toDTO(booking);
  }

  static async updateBooking(
    id: string,
    payload: Partial<UpdateBookingSchema>,
    user: { id: string; role: string }
  ): Promise<BookingDTO> {

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new ApiError("NOT_FOUND");
    }

    const isAdmin = user.role === USER_ROLES.Admin;
    const isOwner = booking.employee.toString() === user.id;

    if (!isAdmin && !isOwner) {
      throw new ApiError("FORBIDDEN");
    }

    const room = payload.room ?? booking.room;
    const date = payload.date ?? booking.date;
    const startTime = payload.startTime ?? booking.startTime;
    const endTime = payload.endTime ?? booking.endTime;

    this.validateBookingDateTime(date, startTime, endTime);
    await this.checkCollisions(room, date, startTime, endTime, id);

    Object.assign(booking, payload);
    await booking.save();

    const populated = await booking.populate([
      { path: "employee", select: "name role" },
      { path: "room", select: "name floor capacity type amenities" },
    ]);

    return this.toDTO(populated);
  }

  static async deleteBooking(
    id: string,
    user: { id: string; role: string }
  ): Promise<void> {

    const booking = await Booking.findById(id);

    if (!booking) {
      throw new ApiError("NOT_FOUND");
    }

    const isAdmin = user.role === USER_ROLES.Admin;
    const isOwner = booking.employee.toString() === user.id;

    if (!isAdmin && !isOwner) {
      throw new ApiError("FORBIDDEN");
    }

    if (booking.endTime < new Date()) {
      throw new ApiError("VALIDATION_ERROR", {
        reason: "Cannot delete past bookings"
      });
    }

    booking.isDeleted = true;
    await booking.save();
  }

  private static async checkCollisions (room: any, date: Date, startTime: Date, endTime: Date, excludeId?: string) {
    const query: any = {
      room,
      date,
      startTime: { $lt: endTime },
      endTime: { $gt: startTime },
    };

    if (excludeId) {
      query._id = { $ne: excludeId };
    }

    const collision = await Booking.findOne(query);

    if (collision) {
      throw new ApiError("BOOKING_CONFLICT");
    }
  }

  private static sameDay(a: Date, b: Date): boolean {
    return (
      a.getUTCFullYear() === b.getUTCFullYear() &&
      a.getUTCMonth() === b.getUTCMonth() &&
      a.getUTCDate() === b.getUTCDate()
    );
  }

  private static validateBookingDateTime(date: Date, startTime: Date, endTime: Date) {
    const now = new Date();

    if (
      !this.sameDay(date, startTime) ||
      !this.sameDay(date, endTime) ||
      endTime <= startTime ||
      startTime < now
    ) {
      throw new ApiError("VALIDATION_ERROR", {
        reason: "Invalid date and time formats",
      });
    }
  }

  private static toDTO(booking: any): BookingDTO {
    return {
      id: booking._id.toString(),
      employee: {
        name: booking.employee.name,
        role: booking.employee.role,
      },
      room: {
        name: booking.room.name,
        floor: booking.room.floor,
        capacity: booking.room.capacity,
        type: booking.room.type,
        amenities: booking.room.amenities,
      },
      date: booking.date.toISOString(),
      startTime: booking.startTime.toISOString(),
      endTime: booking.endTime.toISOString(),
      purpose: booking.purpose,
    };
  }

}

