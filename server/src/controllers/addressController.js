import {
  findAll,
  findById,
} from '../db/addressAccess';

export const getAddressById = (req, res) => {
  findById(req.params.id, (err, address) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(address);
    }
  });
};

export const getAddresses = (req, res) => {
  findAll((err, address) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(address);
    }
  });
};