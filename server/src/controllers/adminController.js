import bcrypt from 'bcryptjs';
import {
  addNew,
  findById,
} from '../db/adminAccess';

const SALT_WORK_FACTOR = 10;

export const getAdminById = (req, res) => {
  findById(req.params.id, (err, admin) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(admin);
    }
  });
};

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
            salt: salt,
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