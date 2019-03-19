import Auditor from '../models/auditorModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newAuditor = new Auditor({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    salt: dataToSave.salt,
    polling_station: dataToSave.polling_station,
  });
  newAuditor.save((err, auditor) => {
    callback(err, auditor);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param auditorId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (auditorId, callback) => {
  Auditor.findById(auditorId).lean().exec((err, auditor) => {
    callback(err, auditor);
  });
};
