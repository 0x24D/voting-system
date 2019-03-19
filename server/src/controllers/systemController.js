import {
  addNew,
  findAll,
  findById,
  updateExistingById,
} from '../db/systemAccess';

/**
 * Add a new system to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const addNewSystem = (req, res) => {
  const newSystem = {
    campaigns: req.body.campaigns,
    language: req.body.language,
    station: req.body.station,
    voters: req.body.voters,
  };
  addNew(newSystem, (err, system) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(system);
    }
  });
};

/**
 * Get all systems from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getSystems = (req, res) => {
  // eslint-disable-next-line
  const station = req.query.station;
  findAll(station, (err, systems) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(systems);
    }
  });
};

/**
 * Get system with passed in ID from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getSystemWithId = (req, res) => {
  findById(req.params.id, (err, system) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(system);
    }
  });
};

/**
 * Update the system with the passed in ID with the submitted data.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
// eslint-disable-next-line
export const editSystemWithId = (req, res) => {
  const systemId = req.params.id;
  findById(systemId, (err, system) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(system).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          updateData[prop] = req.body[prop];
        } else {
          updateData[prop] = system[prop];
        }
      });
      if (req.body.voter) {
        const votersArray = system.voters ? system.voters : [];
        votersArray.push(req.body.voter);
        updateData.voters = votersArray;
      }
      updateExistingById(systemId, updateData, (err2, updatedSystem) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedSystem);
        }
      });
    }
  });
};
