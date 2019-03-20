import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Candidate = mongoose.model('candidate', new Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: Schema.Types.ObjectId, ref: 'party',
  },
  description: {
    type: String,
  },
}));

export default Candidate;
