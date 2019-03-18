import Party from '../models/partyModel';

/**
 * Find a specific record in the database.
 *
 * @param partyId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (partyId, callback) => {
  Party.findById(partyId).lean().exec((err, party) => {
    callback(err, party);
  });
};
