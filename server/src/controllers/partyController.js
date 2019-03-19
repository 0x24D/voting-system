import {
  findById,
  addNew,
  findAll,
} from '../db/partyAccess';

/**
 * Get a party object from the databse using an ID.
 *
 * @param req the request from the client
 * @param res the response to the client
 */

export const getPartyById = (req, res) => {
  findById(req.params.id, (err, party) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(party);
    }
  });
};

/**
 * Gets all Parties stored in the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */

export const getParties = (req, res) => {
  findAll((err, parties) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(parties);
    }
  });
};

/**
 * Adds a new Party to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */

export const addNewParty = (req, res) => {
  const dataToSave = {
    name: req.body.name,
    description: req.body.description,
  };
  console.log(dataToSave);
  addNew(dataToSave, (err, party) => {
    console.log(err, party);
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(party);
    }
  });
};