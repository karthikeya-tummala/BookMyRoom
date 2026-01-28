import mongoose, { Schema } from 'mongoose';

const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    location: {
        type: String,
    },

    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    type: {
        type: String,
    },

}, { timestamps: true }

);

export const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);