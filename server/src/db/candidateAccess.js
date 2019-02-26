import Candidate from '../models/candidateModel';

export const findAll = (callback) => {
  Candidate.find({}).populate('party').lean().exec((err, candidates) => {
    callback(err, candidates);
  });
};

export const findById = (candidateId, callback) => {
  Candidate.findById(candidateId).populate('party').lean().exec((err, candidate) => {
    callback(err, candidate);
  });
};
