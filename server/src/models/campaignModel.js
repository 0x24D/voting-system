import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Campaign = mongoose.model('campaign', new Schema({
  name: {
    type: String,
    required: true,
  },
  total_votes: {
    type: Number,
    required: true,
    default: 0,
  },
  candidates: [{
    type: Schema.Types.ObjectId, ref: 'candidate',
  }],
  votes: {
    type: [Object],
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
  constituencies: [{
    type: Schema.Types.ObjectId, ref: 'constituency',
  }],
  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  end_date: {
    type: Date,
    required: true,
  },
}));

export default Campaign;
