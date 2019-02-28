import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const System = mongoose.model('pollingStation', new Schema({
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
}));

export default System;
