import Constituency from '../models/constituencyModel';

export const findById = (constituencyId, callback) => {
  Constituency.findById(constituencyId).lean().exec((err, constituency) => {
    callback(err, constituency);
  });
};
