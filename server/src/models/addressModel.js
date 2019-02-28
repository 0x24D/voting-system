import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const Address = mongoose.model('address', new Schema({
  lineOne: {
    type: String,
    required: true,
  },
  lineTwo: {
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
    type: Schema.Types.ObjectId, ref: 'Constituency',
  },
}));

export default Address;
