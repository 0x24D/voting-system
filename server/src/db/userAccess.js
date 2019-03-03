import User from '../models/userModel';

export const findById = (userId, callback) => {
  User.findById(userId).lean().exec((err, user) => {
    callback(err, user);
  });
};

export const updateExistingById = (userId, dataToSave, callback) => {
  User.findOneAndUpdate({ _id: userId }, new User(dataToSave),
    { new: true }, (err, user) => {
      callback(err, user);
    });
};
