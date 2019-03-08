import {
  findAll,
  findById,
  addNew,
} from '../db/candidateAccess';

export const getCandidates = (req, res) => {
  findAll((err, candidates) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(candidates);
    }
  });
};

export const getCandidateById = (req, res) => {
  findById(req.params.id, (err, candidate) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(candidate);
    }
  });
};

export const addNewCandidate = (req, res) => {
  const dataToSave = {
    name: req.body.name,
    party: req.body.party,
    description: req.body.description,
  };
  addNew(dataToSave, (err, candidate) => {
    if (err) {
      res.status(500).end();
    } else {
      res.status(201).json(candidate);
    }
  });
};
