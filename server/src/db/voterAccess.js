import Voter from '../models/voterModel';

export const addVoter = (dataToSave, callback) => {
  const newVoter = new Voter({
    name: dataToSave.name,
    
  });
  newVoter.save((err, voter) => {
    callback(err, voter);
  });
};

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
