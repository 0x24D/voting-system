import {
  findAll,
  findById,
} from '../db/constituencyAccess';

export const getAllConstituencies = (req, res) => {
  findAll((err, constituencies) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(constituencies);
    }
  });
};

export const getConstituencyById = (req, res) => {
  findById(req.params.id, (err, constituency) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(constituency);
    }
  });
};
