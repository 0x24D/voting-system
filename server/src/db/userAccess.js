import User from '../models/userModel';

// add new user
//to do
//export const addNewUser = ()

export const findByProperty = (property, value, callback) => {
  User.findOne({ [property]: value }).lean().exec((err, user) => {
    callback(err, user);
  });
};

export const unsetPropertyByUsername = (username, propertyToUnset, callback) => {
  User.findOneAndUpdate({ username }, { $unset: propertyToUnset }, { new: true }, (err, user) => {
    callback(err, user);
  });
};

export const updateExistingByProperty = (property, value, dataToSave, callback) => {
  User.findOneAndUpdate({ [property]: value }, new User(dataToSave),
    { new: true }, (err, user) => {
      callback(err, user);
    });
};
