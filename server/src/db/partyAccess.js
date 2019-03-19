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

/**
 * Find all party records in the database.
 *
 * @param callback the function to call after finding the data
 */

export const findAll = (callback) => {
  Party.find({}).lean().exec((err, party) => {
    callback(err, party);
  });
};

/**
 * Add a new party record to the database
 * @param dataToSave An object containing the information that needs to be added to the database
 * @param callback the function to call after finding the data
 */

export const addNew = (dataToSave, callback) => {
  const newParty = new Party({
    name: dataToSave.name,
    description: dataToSave.description,
  });
  newParty.save((err, party) => {
    callback(err, party);
  });
};
