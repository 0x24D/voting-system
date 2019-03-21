import {
  addNew,
  findAll,
  findByProperty,
  updateExistingByProperty,
} from '../db/userAccess';

/**
 * Add new user to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const addNewUser = (req, res) => {
  const dataToSave = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    roles: req.body.roles,
  };
  addNew(dataToSave, (err, user) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).json(user);
    }
  });
};

/**
 * Get the user with the passed in username from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getUserWithUsername = (req, res) => {
  findByProperty('username', req.params.username, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

/**
 * Update the user with the passed in ID with the submitted data.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
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

/**
 * Gets all users from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */

export const getAllUsers = (req, res) => {
  findAll((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(users);
    }
  });
};
