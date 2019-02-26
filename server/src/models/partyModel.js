import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Party = mongoose.model('party', new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}));

export default Party;
