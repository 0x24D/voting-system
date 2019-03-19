import Address from '../models/addressModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newAddress = new Address({});
  Object.keys(dataToSave).forEach((prop) => {
    newAddress[prop] = dataToSave[prop];
  });
  newAddress.save((err, address) => {
    callback(err, address);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (callback) => {
  Address.find({}).lean().exec((err, address) => {
    callback(err, address);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param addressId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (addressId, callback) => {
  Address.findById(addressId).lean().exec((err, address) => {
    callback(err, address);
  });
};
