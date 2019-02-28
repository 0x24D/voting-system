import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Address = mongoose.model('address', new Schema({
  line_one: {
    type: String,
    required: true,
  },
  line_two: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  constituency: {
    type: Schema.Types.ObjectId, ref: 'constituency',
  },
}));

export default Address;
