import mongoose from 'mongoose';

export const SystemSchema = new mongoose.Schema({
  station: {
    type: String,
    required: true,
  },
  voters: {
    type: String,
    required: true,
  },
  campaigns: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});
