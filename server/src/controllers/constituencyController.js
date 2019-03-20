import {
  addNew,
  findAll,
  findById,
} from '../db/constituencyAccess';

/**
 * Add a new constituency to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const addNewConstituency = (req, res) => {
  const dataToSave = {
    name: req.body.name,
    minimum_age: req.body.minimum_age,
    voting_system: req.body.voting_system,
  };
  addNew(dataToSave, (err, constituency) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(constituency);
    }
  });
};

/**
 * Get all constituencies from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getAllConstituencies = (req, res) => {
  findAll((err, constituencies) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(constituencies);
    }
  });
};

/**
 * Get constituency with the passed in ID from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getConstituencyById = (req, res) => {
  findById(req.params.id, (err, constituency) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(constituency);
    }
  });
};
