import {z} from "zod";
import {ROOM_AMENITIES} from "../models/Room.model.js";

export const createRoomSchema = z.object({
  name: z.string("Name is required").min(1).trim(),
  floor: z.number().min(1).max(200),
  location: z.string().trim().optional().nullable(),
  capacity: z.number().min(1),
  type: z.string().trim().optional().nullable(),
  amenities: z.array(
    z.string()
    .transform((val) => val.trim().toLowerCase().replace(/[\s-]+/g, '_'))
    .pipe(
      z.enum(ROOM_AMENITIES, {
        error: () => ({ message: "Invalid amenity." }),
      })
    )
  ).optional(),

});

export const updateRoomSchema = createRoomSchema.partial();

export type CreateRoomPayload = z.infer<typeof createRoomSchema>;

