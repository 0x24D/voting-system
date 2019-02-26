import Candidate from '../models/candidateModel';

export const findAll = ((callback) => {
  Candidate.find({}).populate('party').lean().exec((err, candidates) => {
    callback(err, candidates);
  });
});
