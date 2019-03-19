import User from '../models/userModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newUser = new User({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    roles: dataToSave.roles,
  });
  newUser.save((err, user) => {
    callback(err, user);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param property the property of the record to find by
 * @param value the value of the property to find
 * @param callback the function to call after finding the data
 */
export const findByProperty = (property, value, callback) => {
  User.findOne({ [property]: value }).lean().exec((err, user) => {
    callback(err, user);
  });
};

/**
 * Unset a property in a record in the database.
 *
 * @param username the username of the record to modify
 * @param propertyToUnset the property to unset
 * @param callback the function to call after modifying the record
 */
export const unsetPropertyByUsername = (username, propertyToUnset, callback) => {
  User.findOneAndUpdate({ username }, { $unset: propertyToUnset }, { new: true }, (err, user) => {
    callback(err, user);
  });
};

/**
 * Update a record in the database.
 *
 * @param property the property of the record to find by
 * @param value the value of the property to find
 * @param dataToSave the data to store in the record
 * @param callback the function to call after updating the record
 */
export const updateExistingByProperty = (property, value, dataToSave, callback) => {
  User.findOneAndUpdate({ [property]: value }, new User(dataToSave),
    { new: true }, (err, user) => {
      callback(err, user);
    });
};
