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

export const addNew = (dataToSave, callback) => {
  const newCandidate = new Candidate({
    name: dataToSave.name,
    party: dataToSave.party,
    description: dataToSave.description,
  });
  newCandidate.save((err, candidate) => {
    callback(err, candidate);
  });
};