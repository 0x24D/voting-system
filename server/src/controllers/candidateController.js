import {
  findAll,
  findById,
} from '../db/candidateAccess';

/**
 * Get all candidates from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getCandidates = (req, res) => {
  findAll((err, candidates) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(candidates);
    }
  });
};

/**
 * Get candidate with passed in ID from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getCandidateById = (req, res) => {
  findById(req.params.id, (err, candidate) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(candidate);
    }
  });
};
