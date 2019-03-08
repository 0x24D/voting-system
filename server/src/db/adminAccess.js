import Admin from '../models/adminModel';

//to do
//export const addNewAdmin = ()

export const findById = (adminId, callback) => {    //kinda random, needs testing?
    Admin.findById(adminId).lean().exec((err, admin) => {
    callback(err, admin);
  });
};
