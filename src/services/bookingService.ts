import {CreateBookingSchema} from "../validators/booking.schema.js";
import {Booking} from "../models/index.js";
import {BookingDTO} from "../types/booking.dto.js";

export class BookingService {
  static async create(payload: CreateBookingSchema): Promise<BookingDTO> {
    const booking = await Booking.create(payload);

    const populatedBooking = await booking.populate([
      { path: "employee", select: "name role" },
      { path: "room", select: "name floor capacity type amenities" },
    ]);

    return {
      id:populatedBooking._id.toString(),
      employee: {
        name: populatedBooking.employee.name,
        role: populatedBooking.employee.role,
      },
      room: {
        name: populatedBooking.room.name,
        floor: populatedBooking.room.floor,
        capacity: populatedBooking.room.capacity,
        type: populatedBooking.room.type,
        amenities: populatedBooking.room.amenities,
      },
      date: populatedBooking.date.toISOString(),
      startTime: populatedBooking.startTime.toISOString(),
      endTime: populatedBooking.endTime.toISOString(),
      purpose: populatedBooking.purpose,
    };
  }

  static async getBookings(): Promise<BookingDTO[]> {
    const bookings = await Booking.find()
    .populate("employee", "name role")
    .populate("room", "name floor capacity type amenities")
    .lean();

    return bookings.map((b) => ({
      id: b._id.toString(),
      employee: {
        name: b.employee.name,
        role: b.employee.role,
      },
      room: {
        name: b.room.name,
        floor: b.room.floor,
        capacity: b.room.capacity,
        type: b.room.type,
        amenities: b.room.amenities,
      },
      date: b.date.toISOString(),
      startTime: b.startTime.toISOString(),
      endTime: b.endTime.toISOString(),
      purpose: b.purpose,
    }));
  }

}