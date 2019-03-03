import {
  findById,
} from '../db/partyAccess';

export const getPartyById = (req, res) => {
  findById(req.params.id, (err, party) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(party);
    }
  });
};
