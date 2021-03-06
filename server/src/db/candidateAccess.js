import Candidate from '../models/candidateModel';

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (callback) => {
  Candidate.find({}).lean().exec((err, candidates) => {
    callback(err, candidates);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param candidateId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (candidateId, callback) => {
  Candidate.findById(candidateId).lean().exec((err, candidate) => {
    callback(err, candidate);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param callback the function to call after finding the data
 * @param dataToSave An object containing the information that needs to be added to the database
 */

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
