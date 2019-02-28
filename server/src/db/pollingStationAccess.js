import PollingStation from '../models/pollingStationModel';

export const findById = (pollingStationId, callback) => {
    PollingStation.findById(pollingStationId).lean().exec((err, pollingStation) => {
    callback(err, pollingStation);
  });
};