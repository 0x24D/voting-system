import mongoose from 'mongoose';

export const ConstituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  minimumAge: {
    type: String,
    required: true,
    // should this not have default of 18?
  },
  votingSystem: {
    type: String,
    required: true,
    // enum or reference code table?
  },
});
