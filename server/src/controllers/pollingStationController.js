import {
  findAll,
  findById,
} from '../db/pollingStationAccess';

/**
 * Returns a polling station by based on its ID to res
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getPollingStationById = (req, res) => {
  findById(req.params.id, (err, pollingStation) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(pollingStation);
    }
  });
};

/**
 * Returns all polling stations in the database to res
 * 
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getPollingStations = (req, res) => {
  findAll((err, pollingStations) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(pollingStations);
    }
  });
};