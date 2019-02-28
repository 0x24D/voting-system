import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const PollingStation = mongoose.model('pollingStation', new Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId, ref: 'address',
  },
  open_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  close_time: {
    type: Date,
    required: true,
  },
}));

export default PollingStation;
