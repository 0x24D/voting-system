import {
  findAll,
  findById,
  addNew,
} from '../db/pollingStationAccess';

/**
 * Add new polling station to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const addNewPollingStation = (req, res) => {
  addNew({ address: req.body.address }, (err, station) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(station);
    }
  });
};


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
