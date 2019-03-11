import Admin from '../models/adminModel';

export const addNew = (dataToSave, callback) => {
  const newAdmin = new Admin({
    username: dataToSave.username,
    name: dataToSave.name,
    email: dataToSave.email,
    password: dataToSave.password,
    salt: dataToSave.salt,
  });
  newAdmin.save((err, admin) => {
    callback(err, admin);
  });
};

export const findById = (adminId, callback) => {    //kinda random, needs testing?
    Admin.findById(adminId).lean().exec((err, admin) => {
    callback(err, admin);
  });
};
