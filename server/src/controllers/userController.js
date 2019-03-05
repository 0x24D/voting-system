import {
  findByProperty,
  updateExistingByProperty,
} from '../db/userAccess';

export const getUserWithId = (req, res) => {
// get the user with the request userId and if no errors
// return the user details in the response
  findByProperty('_id', req.params.id, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

export const editUserWithId = (req, res) => {
  const userId = req.params.id;
  findByProperty('_id', userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(user).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          updateData[prop] = req.body[prop];
        } else {
          updateData[prop] = user[prop];
        }
      });
      updateExistingByProperty('_id', userId, updateData, (err2, updatedUser) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedUser);
        }
      });
    }
  });
};
