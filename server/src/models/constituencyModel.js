import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Constituency = mongoose.model('constituency', new Schema({
  name: {
    type: String,
    required: true,
  },
  minimum_age: {
    type: Number,
    required: true,
  },
  voting_system: {
    type: String,
    required: true,
    // enum or reference code table?
  },
}));

export default Constituency;
