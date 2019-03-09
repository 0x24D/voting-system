import {
  findById,
} from '../db/auditorAccess';

/**
 * <p> gets the auditor using their id which sent in the request
 * parameters from the database and returns
 * it to the client
 * </p>
 * @param req the request from the client
 * @param res the repsonse from the server
 */

export const getAuditorWithId = (req, res) => {
  findById(req.params.id, (err, auditor) => {
    if (err) {
      res.send(err);
    } else {
      res.json(auditor);
    }
  });
};
