import mongoose from 'mongoose';

export const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  candidates: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Candidate',
  }],
  votes: {
    type: Map,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  active: {
    type: String, // enum or bool, tbd
    required: true,
  },
  constituences: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Constituency',
  }],
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
});
