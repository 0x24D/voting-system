import {
  findById,
} from '../db/partyAccess';

/**
 * Get party with the passed in ID from the database.
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
