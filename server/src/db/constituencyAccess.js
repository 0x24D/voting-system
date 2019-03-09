import Constituency from '../models/constituencyModel';

export const findAll = (callback) => {
  Constituency.find({}).lean().exec((err, constituencies) => {
    callback(err, constituencies);
  });
};

export const findById = (constituencyId, callback) => {
  Constituency.findById(constituencyId).lean().exec((err, constituency) => {
    callback(err, constituency);
  });
};
