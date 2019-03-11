import {
  findById,
  addNew,
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