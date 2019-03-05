import {
  findById,
  updateExistingById,
} from '../db/voterAccess';

export const getVoterWithId = (req, res) => {
  console.log(req.params.id);
  findById(req.params.id, (err, voter) => {
    console.log(voter);
    if (err) {
      res.send(err);
    } else {
      res.json(voter);
    }
  });
};

export const editVoterWithId = (req, res) => {
  const voterId = req.params.id;
  findById(voterId, (err, voter) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(voter).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          updateData[prop] = req.body[prop];
        } else {
          updateData[prop] = voter[prop];
        }
      });
      updateExistingById(voterId, updateData, (err2, updatedVoter) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedVoter);
        }
      });
    }
  });
};
