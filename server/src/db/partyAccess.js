import Party from '../models/partyModel';

export const findById = (partyId, callback) => {
  Party.findById(partyId).lean().exec((err, party) => {
    callback(err, party);
  });
};
