import { UserSchema } from '../models/userModel';

const user = mongoose.model('user', UserSchema);

// system constructor 
// system = () => { 
// };

// User(name, email, password, role)
export const validateEmail = (req, res) => {

};
export const hash = (req, res) => {

};
export const addAuthenticationAttempt = (req, res) => {

};
export const restAuthenticationAttempts = (req, res) => {

};
export const validatePassword = (req, res) => {

};

