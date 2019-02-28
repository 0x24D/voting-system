import User from '../models/userModel';

export const findById = (userId, callback) => {
  User.findById(userId).lean().exec((err, user) => {
    callback(err, user);
  });
};
