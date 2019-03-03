import {
  findAll,
  findById,
} from '../db/systemAccess';

export const getSystems = (req, res) => {
  findAll((err, systems) => {
    if (err) {
      res.status(500).send(err);
    } else {
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
  // TODO: implement (PUT endpoint)
};
