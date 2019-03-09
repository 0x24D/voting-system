import mongoose from 'mongoose';
import User from './userModel';

// eslint-disable-next-line
const Schema = mongoose.Schema;
/**
 * creates a new mongoose schema
 */
const AuditorSchema = new Schema({

  polling_station: {
    type: mongoose.Schema.Types.ObjectId, ref: 'pollingStation',
  },

});
/**
 * creates an inheritence like model for the voter and adds on the user model
 */
const Auditor = User.discriminator('auditor', AuditorSchema);

export default Auditor;
