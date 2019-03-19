import {
  findAll,
  findById,
} from '../db/constituencyAccess';

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
