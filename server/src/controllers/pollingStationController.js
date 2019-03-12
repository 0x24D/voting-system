import {
  findAll,
  findById,
} from '../db/pollingStationAccess';

export const getPollingStationById = (req, res) => {
  findById(req.params.id, (err, pollingStation) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(pollingStation);
    }
  });
};

export const getPollingStations = (req, res) => {
  findAll((err, pollingStations) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(pollingStations);
    }
  });
};