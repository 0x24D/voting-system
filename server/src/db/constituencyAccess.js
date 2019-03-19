import Constituency from '../models/constituencyModel';

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
