import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: { // shouldn't this be role?
    type: String,
    // required: true,
  },
  authenticationAttempts: {
    type: Number,
    required: true,
    default: 0,
  },

});
