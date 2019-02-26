import mongoose from 'mongoose';

export const SystemSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId, ref: 'PollingStation',
  },
  voters: {
    type: String, // voter ref
    required: true,
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Campaign',
  }],
  language: {
    type: String,
    required: true,
    default: 'en-gb',
  },
});
