import mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
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
    tyoe: String,
    required: true,
  },
  constituency: {
    type: String,
    required: true,
  },
});
