import PollingStation from '../models/pollingStationModel';

export const findAll = (callback) => {
  PollingStation.find({}).lean().exec((err, pollingStation) => {
    callback(err, pollingStation);
  });
};

export const findById = (pollingStationId, callback) => {
  PollingStation.findById(pollingStationId).lean().exec((err, pollingStation) => {
    callback(err, pollingStation);
  });
};
