import Voter from '../models/voterModel';

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

export const findAll = (callback) => {
  Voter.find({}).lean().exec((err, voters) => {
    callback(err, voters);
  });
};

export const findById = (voterId, callback) => {
  Voter.findById(voterId).lean().exec((err, voter) => {
    callback(err, voter);
  });
};

export const updateExistingById = (voterId, dataToSave, callback) => {
  Voter.findOneAndUpdate({ _id: voterId }, new Voter(dataToSave),
    { new: true }, (err, voter) => {
      callback(err, voter);
    });
};
