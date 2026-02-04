import { z } from "zod";

export const createBookingSchema = z.object({
  employee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  room: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),

  date: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),

  purpose: z.string().trim().optional(),
}).refine(
  (data) => data.startTime < data.endTime,
  {
    message: "startTime must be before endTime",
    path: ["endTime"],
  }
);

export type CreateBookingSchema = z.infer<typeof createBookingSchema>;
