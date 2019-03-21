import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const PollingStation = mongoose.model('pollingStation', new Schema({
  address: {
    type: mongoose.Schema.Types.ObjectId, ref: 'address',
  },
}));

export default PollingStation;
