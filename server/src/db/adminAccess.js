import Admin from '../models/adminModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newAdmin = new Admin({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    salt: dataToSave.salt,
  });
  newAdmin.save((err, admin) => {
    callback(err, admin);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param adminId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (adminId, callback) => {
  Admin.findById(adminId).lean().exec((err, admin) => {
    callback(err, admin);
  });
};
