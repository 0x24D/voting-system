import {
  addNew,
  findAll,
  findById,
} from '../db/addressAccess';

export const addNewAddress = (req, res) => {
  const props = ['line_one', 'line_two',
    'town', 'county', 'country',
    'postcode', 'constituency'];
  const dataToSave = {};
  props.forEach((prop) => {
    if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
      dataToSave[prop] = req.body[prop];
    }
  });
  addNew(dataToSave, (err, address) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(address);
    }
  });
};

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
