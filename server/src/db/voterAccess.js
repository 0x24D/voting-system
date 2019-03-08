import Voter from '../models/voterModel';

//to do
//export const addNewVoter = ()

export const findById = (voterId, callback) => {
  console.log(Voter);
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
