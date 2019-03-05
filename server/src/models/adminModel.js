import mongoose from 'mongoose';
import User from './userModel';

// eslint-disable-next-line
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

});

const Admin = User.discriminator('admin', AdminSchema);

export default Admin;
