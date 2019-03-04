import mongoose from 'mongoose';
import User from './userModel';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const VoterSchema = new Schema({
  voted: {
    type: Boolean,
    required: true,
    default: false,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId, ref: 'address',
  },
});

const Voter = User.discriminator('voter', VoterSchema);

export default Voter;
