import {
  addNew,
  findById,
} from '../db/adminAccess';

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
  const dataToSave = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  addNew(dataToSave, (err, admin) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).json(admin);
    }
  });
};