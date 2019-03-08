import Admin from '../models/adminModel';

export const findById = (adminId, callback) => {    //kinda random, needs testing?
    Admin.findById(adminId).lean().exec((err, admin) => {
    callback(err, admin);
  });
};
