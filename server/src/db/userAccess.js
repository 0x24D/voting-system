import User from '../models/userModel';

export const findById = (userId, callback) => {
  User.findById(userId).lean().exec((err, user) => {
    callback(err, user);
  });
};

export const updateExistingById = (userId, currentUser, dataToSave, callback) => {
  const updatedUser = currentUser;
  updatedUser.authentication_attempts = dataToSave.authentication_attempts;
  User.findOneAndUpdate({ _id: userId }, new User(updatedUser),
    { new: true }, (err, user) => {
      callback(err, user);
    });
};
