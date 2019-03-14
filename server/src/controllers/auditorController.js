import bcrypt from 'bcryptjs';
import {
  addNew,
  findById,
} from '../db/auditorAccess';

const SALT_WORK_FACTOR = 10;
/**
 * Gets the auditor using their id which is sent in the request
 * parameters from the database and returns
 * it to the client.
 *
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getAuditorWithId = (req, res) => {
  findById(req.params.id, (err, auditor) => {
    if (err) {
      res.send(err);
    } else {
      res.json(auditor);
    }
  });
};

/**
 * Adds a new auditor using the information in req, 
 * this also uses salt in order hash the password before
 * saving
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const addNewAuditor = (req, res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          const newAuditor = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            salt: salt,
            polling_station: req.body.polling_station,
          };
          addNew(newAuditor, (err3, auditor) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              res.json(auditor);
            }
          });
        }
      });
    }
  });
};