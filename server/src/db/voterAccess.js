import Voter from '../models/voterModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newVoter = new Voter({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    salt: dataToSave.salt,
    date_of_birth: dataToSave.date_of_birth,
    address: dataToSave.address,
  });
  newVoter.save((err, voter) => {
    callback(err, voter);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (callback) => {
  Voter.find({}).lean().exec((err, voters) => {
    callback(err, voters);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param voterId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (voterId, callback) => {
  Voter.findById(voterId).lean().exec((err, voter) => {
    callback(err, voter);
  });
};

/**
 * Update a record in the database.
 *
 * @param voterId the ID of the record to update
 * @param dataToSave the data to store in the record
 * @param callback the function to call after updating the record
 */
export const updateExistingById = (voterId, dataToSave, callback) => {
  Voter.findOneAndUpdate({ _id: voterId }, new Voter(dataToSave),
    { new: true }, (err, voter) => {
      callback(err, voter);
    });
};
