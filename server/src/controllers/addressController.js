import {
  addNew,
  findAll,
  findById,
} from '../db/addressAccess';

/**
 * Add new address to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
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

/**
 * Get address with passed in ID from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getAddressById = (req, res) => {
  findById(req.params.id, (err, address) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(address);
    }
  });
};

/**
 * Get all addresses from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getAddresses = (req, res) => {
  findAll((err, address) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(address);
    }
  });
};
