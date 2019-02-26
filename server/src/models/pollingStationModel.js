import mongoose from 'mongoose';

export const PollingStationSchema = new mongoose.Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Address',
  },
  openTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  closeTime: {
    type: Date,
    required: true,
  },
});
