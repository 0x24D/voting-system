import Voter from '../models/voterModel';

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
