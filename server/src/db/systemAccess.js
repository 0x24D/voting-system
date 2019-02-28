import System from '../models/systemModel';

export const findById = (partyId, callback) => {
  System.findById(systemId).lean().exec((err, system) => {
    callback(err, system);
  });
};
