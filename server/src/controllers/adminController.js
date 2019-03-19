import bcrypt from 'bcryptjs';
import {
  addNew,
  findById,
} from '../db/adminAccess';

const SALT_WORK_FACTOR = 10;

/**
 * Gets the admin using their id which is sent in the request
 * parameters from the database and returns
 * it to the client.
 *
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getAdminById = (req, res) => {
  findById(req.params.id, (err, admin) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(admin);
    }
  });
};

/**
 * Adds a new admin using the information in req,
 * this also uses salt in order hash the password before
 * saving
 *
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const addNewAdmin = (req, res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          const newAdmin = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            salt,
          };
          addNew(newAdmin, (err3, admin) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              res.json(admin);
            }
          });
        }
      });
    }
  });
};
