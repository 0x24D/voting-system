import User from '../models/userModel';

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
