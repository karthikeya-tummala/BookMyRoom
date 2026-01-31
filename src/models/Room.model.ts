import mongoose, { Schema } from 'mongoose';
import type { InferSchemaType } from "mongoose";

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
        default: []
    }

}, { timestamps: true }

);

export type RoomDocument = InferSchemaType<typeof roomSchema>;

export const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);