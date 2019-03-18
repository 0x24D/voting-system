import System from '../models/systemModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newSystem = new System({
    campaigns: dataToSave.campaigns,
    language: dataToSave.language,
    station: dataToSave.station,
    voters: dataToSave.voters,
  });
  newSystem.save((err, system) => {
    callback(err, system);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (station, callback) => {
  let findTerm = {};
  if (station) {
    findTerm = { station };
  }
  System.find(findTerm).lean().exec((err, systems) => {
    callback(err, systems);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param systemId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (systemId, callback) => {
  System.findById(systemId).lean().exec((err, system) => {
    callback(err, system);
  });
};

/**
 * Update a record in the database.
 *
 * @param systemId the ID of the record to update
 * @param dataToSave the data to store in the record
 * @param callback the function to call after updating the record
 */
export const updateExistingById = (systemId, dataToSave, callback) => {
  System.findOneAndUpdate({ _id: systemId }, new System(dataToSave),
    { new: true }, (err, system) => {
      callback(err, system);
    });
};
