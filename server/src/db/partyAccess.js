import Party from '../models/partyModel';

export const findById = (partyId, callback) => {
  Party.findById(partyId).lean().exec((err, party) => {
    callback(err, party);
  });
};

export const addNew = (dataToSave, callback) => {
  const newParty = new Party({
    name: dataToSave.name,
    description: dataToSave.description,
  });
  newParty.save((err, party) => {
    callback(err, party);
  });
};
