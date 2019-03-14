import System from '../models/systemModel';

export const findAll = (station, callback) => {
  let findTerm = {};
  if (station) {
    findTerm = { station };
  }
  System.find(findTerm).lean().exec((err, systems) => {
    callback(err, systems);
  });
};

export const findById = (systemId, callback) => {
  System.findById(systemId).lean().exec((err, system) => {
    callback(err, system);
  });
};

export const updateExistingById = (systemId, dataToSave, callback) => {
  System.findOneAndUpdate({ _id: systemId }, new System(dataToSave),
    { new: true }, (err, system) => {
      callback(err, system);
    });
};
