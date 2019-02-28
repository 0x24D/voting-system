import mongoose from 'mongoose';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const User = mongoose.model('user', new Schema({
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
  authentication_attempts: {
    type: Number,
    required: true,
    default: 0,
  },
}));

export default User;
