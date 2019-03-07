import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const System = mongoose.model('system', new Schema({
  station: {
    type: Schema.Types.ObjectId, ref: 'pollingStation',
  },
  voters: [{
    type: Schema.Types.ObjectId, ref: 'voter',
  }],
  campaigns: [{
    type: Schema.Types.ObjectId, ref: 'campaign',
  }],
  language: {
    type: String,
    required: true,
    default: 'en-gb',
  },
}));

export default System;
