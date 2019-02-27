import {
  findById,
} from '../db/partyAccess';

export const getParties = (req, res) => {
  // GET
};

export const getPartyById = (req, res) => {
  findById(req.params.id, (err, party) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(party);
    }
  });
};

export const addParty = (req, res) => {
// POST
};

export const updatePartyById = (req, res) => {
// PUT
};

export const deletePartyById = (req, res) => {
// DELETE
};
