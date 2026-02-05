import { z } from "zod";

export const baseBookingSchema = z.object({
  employee: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
  room: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),

  date: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),

  purpose: z.string().trim().optional(),
});
export const createBookingSchema = baseBookingSchema.refine(
  (data) => data.startTime < data.endTime,
  {
    message: "startTime must be before endTime",
    path: ["endTime"],
  }
);

export const updateBookingSchema = baseBookingSchema
.omit({ employee: true })
.partial()
.superRefine((data, ctx) => {

  const startTime = data.startTime;
  const endTime = data.endTime;

  const hasStart = startTime !== undefined;
  const hasEnd = endTime !== undefined;

  if (hasStart !== hasEnd) {
    ctx.addIssue({
      path: ["endTime"],
      message: "startTime and endTime must be provided together",
      code: "custom",
    });
    return;
  }

  if (hasStart && hasEnd && startTime >= endTime) {
    ctx.addIssue({
      path: ["endTime"],
      message: "endTime must be greater than startTime",
      code: "custom",
    });
  }
});

export type UpdateBookingSchema = z.infer<typeof updateBookingSchema>;
export type CreateBookingSchema = z.infer<typeof createBookingSchema>;

