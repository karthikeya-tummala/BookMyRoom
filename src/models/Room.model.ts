import mongoose, {Schema} from 'mongoose';
import type {InferSchemaType} from "mongoose";

export const ROOM_AMENITIES = [
  'projector',
  'whiteboard',
  'tv',
  'video_conferencing',
  'air_conditioning',
  'wifi'
] as const;

const roomSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    floor: {
      type: Number,
      required: true,
      min: 1,
      max: 200,
    },

    location: {
      type: String,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1
    },

    type: {
      type: String,
    },

    amenities: {
      type: [String],
      enum: ROOM_AMENITIES,
      set: (vals: string[]) =>
        vals.map(v =>
          v
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/-+/g, '_')
        ),
      default: [],
    }


  }, {timestamps: true}
);

export type RoomType = InferSchemaType<typeof roomSchema>;

export const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);