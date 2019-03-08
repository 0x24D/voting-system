import {
    findById,
} from '../db/adminAccess';
import Admin from '../models/adminModel';
  

export const getAdminById = (req, res) => { //needs testing
    findById(req.params.id, (err, admin) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(admin);
      }
    });
  };
  

export const addNewAdmin = (req, res) => { //needs testing
  const newAdmin = new Admin({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      roles: "admin",
  });
  newAdmin.save((err, file) => {
      if (err) {
          res.send(err);
      } else {
          res.json(file);
      }
  });
};