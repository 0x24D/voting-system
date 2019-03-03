import {
  findById,
  updateExistingById,
} from '../db/userAccess';

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

export const editUserWithId = (req, res) => {
  const userId = req.params.id;
  findById(userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(user).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          if (prop === 'authentication_attempts' && typeof req.body[prop] === 'string') {
            if (req.body[prop] === '++') {
              updateData[prop] = user[prop] + 1;
            } else if (req.body[prop] === '--' && user[prop] > 0) {
              updateData[prop] = user[prop] - 1;
            }
          } else {
            updateData[prop] = req.body[prop];
          }
        } else {
          updateData[prop] = user[prop];
        }
      });
      updateExistingById(userId, updateData, (err2, updatedUser) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedUser);
        }
      });
    }
  });
};
