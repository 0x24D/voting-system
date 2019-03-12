import bcrypt from 'bcryptjs';
import {
  addNew,
  findById,
  updateExistingById,
} from '../db/voterAccess';

const SALT_WORK_FACTOR = 10;

/**
 * Adds a new voter using the information in req, 
 * this also uses salt in order hash the password before
 * saving
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const addNewVoter = (req, res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      res.status(500).send(err);
    } else {
      bcrypt.hash(req.body.password, salt, (err2, hash) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          const newVoter = {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            salt: salt,
            date_of_birth: req.body.date_of_birth,
            address: req.body.address,
          };
          addNew(newVoter, (err3, voter) => {
            if (err3) {
              res.status(500).send(err3);
            } else {
              res.json(voter);
            }
          });
        }
      });
    }
  });
};

/**
 * Gets the voter using their id which sent in the request
 * parameters from the database and returns
 * it to the client.
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getVoterWithId = (req, res) => {
  findById(req.params.id, (err, voter) => {
    if (err) {
      res.send(err);
    } else {
      res.json(voter);
    }
  });
};

/**
 * Updates the voter using ID with the new information sent in req
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const editVoterWithId = (req, res) => {
  const voterId = req.params.id;
  findById(voterId, (err, voter) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(voter).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          updateData[prop] = req.body[prop];
        } else {
          updateData[prop] = voter[prop];
        }
      });
      updateExistingById(voterId, updateData, (err2, updatedVoter) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedVoter);
        }
      });
    }
  });
};
