import {
  findById,
  updateExistingById,
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
  const userId = req.params.id;
  findById(userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateUser = {
        authenticationAttempts: user.authenticationAttempts + 1,
      };
      updateExistingById(userId, user, updateUser, (err2, updatedUser) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedUser);
        }
      });
    }
  });

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
