import Constituency from '../models/constituencyModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newConstituency = new Constituency({});
  Object.keys(dataToSave).forEach((prop) => {
    newConstituency[prop] = dataToSave[prop];
  });
  newConstituency.save((err, constituency) => {
    callback(err, constituency);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (callback) => {
  Constituency.find({}).lean().exec((err, constituencies) => {
    callback(err, constituencies);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param constituencyId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (constituencyId, callback) => {
  Constituency.findById(constituencyId).lean().exec((err, constituency) => {
    callback(err, constituency);
  });
};
