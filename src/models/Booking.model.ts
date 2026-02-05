import mongoose, {Schema} from 'mongoose';

const bookingSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },

  room: {
    type: Schema.Types.ObjectId,
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

  purpose: String,

  isDeleted: Boolean

  }, {timestamps: true}
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);