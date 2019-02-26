import {
  findAll,
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

export const addCandidate = (req, res) => {
  // POST

};
export const removeCandidate = (req, res) => {
  // DELETE
};
export const assignCandidateToConstituency = (req, res) => {
  // PUT
};
