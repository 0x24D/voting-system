import mongoose from 'mongoose';

export const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalVotes: {
    type: Number,
    required: true,
  },
  candidates: {
    type: String,
    required: true,
  },
  votes: {
    type: Map,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  active: {
    type: String,
    required: true,
  },
  constituences: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});
