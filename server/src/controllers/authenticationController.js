import Paseto from 'paseto.js';
import bcrypt from 'bcryptjs';
import {
  findByProperty,
  unsetPropertyByUsername,
  updateExistingByProperty,
} from '../db/userAccess';

export const loginUser = (req, res) => {
  const unHashedPassword = req.body.password;
  let hashedPassword;
  findByProperty('username', req.body.username, (err, user) => {
    if (err) {
      res.status(500).end();
    } else if (user) {
      if (user.token) {
        res.status(409).end();
      } else {
        bcrypt.hash(unHashedPassword, user.salt, (err2, hash) => {
          if (err2) {
            res.status(500).end();
          } else {
            hashedPassword = hash;
            if (user.password === hashedPassword) {
              const encoder = new Paseto.V2();
              encoder.symmetric()
                .then((sk) => {
                  const message = `${user.username}+${Date.now()}`;
                  return encoder.encrypt(message, sk);
                })
                .then((token) => {
                  const newUser = user;
                  newUser.token = token;
                  updateExistingByProperty('username', user.username, newUser, (err3) => {
                    if (err3) {
                      res.status(500).end();
                    } else {
                      res.json({ token });
                    }
                  });
                });
            } else {
              res.status(500).end();
            }
          }
        });
      }
    } else {
      res.status(500).end();
    }
  });
};

export const logoutUser = (req, res) => {
  const tokenToCheck = req.headers.authorization;
  if (tokenToCheck) {
    findByProperty('token', tokenToCheck, (err, user) => {
      if (err) {
        res.status(500).end();
      } else if (user && user.token === tokenToCheck) {
        unsetPropertyByUsername(user.username, { token: tokenToCheck }, (err2) => {
          if (err2) {
            res.status(500).end();
          } else {
            res.status(204).end();
          }
        });
      } else {
        res.status(401).end();
      }
    });
  } else {
    res.status(401).end();
  }
};
