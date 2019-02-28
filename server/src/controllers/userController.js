import {
  findById,
} from '../db/userAccess';

export const addUser = (req, res) => {

};

export const editUser = (req, res) => {

};

export const removeUser = (req, res) => {

};

export const validateEmail = (req, res) => {

};
export const hash = (req, res) => {

};
export const addAuthenticationAttempt = (req, res) => {

};
export const resetAuthenticationAttempts = (req, res) => {

};
export const validatePassword = (req, res) => {

};

export const getUserWithId = (req, res) => {
// get the user with the request userId and if no errors
// return the user details in the response
  findById(req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};
