import {
  findAll,
  findById,
  updateExistingById,
} from '../db/systemAccess';

export const getSystems = (req, res) => {
  // eslint-disable-next-line
  const station = req.query.station;
  findAll(station, (err, systems) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(systems);
      res.json(systems);
    }
  });
};

export const getSystemWithId = (req, res) => {
  findById(req.params.id, (err, system) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(system);
    }
  });
};

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
