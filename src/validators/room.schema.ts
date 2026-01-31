import {z} from "zod";
import type { RoomDocument } from "../models/Room.model.js";

type RoomInputTarget = Omit<RoomDocument, 'createdAt' | 'updatedAt' | '_id' | '__v'>;

export const createRoomSchema = z.object({
  name: z.string().nonempty(),
  floor: z.number().min(1).max(200),
  location: z.string().optional(),
  capacity: z.number().min(1),
  type: z.string(),
  amenities: z.array(z.string()).default([]),
}) satisfies z.ZodType<RoomInputTarget>;