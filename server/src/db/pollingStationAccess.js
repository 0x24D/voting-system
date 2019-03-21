import PollingStation from '../models/pollingStationModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newPollingStation = new PollingStation({
    address: dataToSave.address,
  });
  newPollingStation.save((err, system) => {
    callback(err, system);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (callback) => {
  PollingStation.find({}).lean().exec((err, pollingStation) => {
    callback(err, pollingStation);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param pollingStationId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (pollingStationId, callback) => {
  PollingStation.findById(pollingStationId).lean().exec((err, pollingStation) => {
    callback(err, pollingStation);
  });
};
