import {
  findById,
} from '../db/constituencyAccess';

export const getConstituencyById = (req, res) => {
  findById(req.params.id, (err, constituency) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(constituency);
    }
  });
};
