import {
  findById,
} from '../db/auditorAccess';

export const getAuditorWithId = (req, res) => {
  findById(req.params.id, (err, auditor) => {
    if (err) {
      res.send(err);
    } else {
      res.json(auditor);
    }
  });
};
