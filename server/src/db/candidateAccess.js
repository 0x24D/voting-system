import Candidate from '../models/candidateModel';

export const findAll = (callback) => {
  Candidate.find({}).lean().exec((err, candidates) => {
    callback(err, candidates);
  });
};

export const findById = (candidateId, callback) => {
  Candidate.findById(candidateId).lean().exec((err, candidate) => {
    callback(err, candidate);
  });
};
