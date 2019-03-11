import mongoose from 'mongoose';
import User from './userModel';

// eslint-disable-next-line
const Schema = mongoose.Schema;

// Creates a new mongoose schema
const AuditorSchema = new Schema({

  polling_station: {
    type: mongoose.Schema.Types.ObjectId, ref: 'pollingStation',
  },

});

// Inherits from the user model. 
const Auditor = User.discriminator('auditor', AuditorSchema);

export default Auditor;
