import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema({
    employee: {
        ref: 'Employee',
        required: true,
    },

    room: {
        ref: 'Room',
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    startTime: {
        type: Date,
        required: true,
    },

    endTime: {
        type: Date,
        required: true,
    },

    purpose: String


}, { timestamps: true }

);

export const booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);