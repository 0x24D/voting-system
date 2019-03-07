import mongoose from 'mongoose';
import User from './userModel';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const AuditorSchema = new Schema({

});

const Auditor = User.discriminator('auditor', AuditorSchema);

export default Auditor;
