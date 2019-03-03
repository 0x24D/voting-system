import {
  findAll,
  findById,
  updateExistingById,
} from '../db/campaignAccess';

export const getCampaigns = (req, res) => {
  // eslint-disable-next-line
  const constituency = req.query.constituency;
  findAll(constituency, (err, campaigns) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(campaigns);
    }
  });
};

export const getCampaignById = (req, res) => {
  findById(req.params.id, (err, campaign) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(campaign);
    }
  });
};

export const editCampaignById = (req, res) => {
  const campaignId = req.params.id;
  findById(campaignId, (err, campaign) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(campaign).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          if (prop === 'total_votes' && typeof req.body[prop] === 'string') {
            if (req.body[prop] === '++') {
              updateData[prop] = campaign[prop] + 1;
            } else if (req.body[prop] === '--' && campaign[prop] > 0) {
              updateData[prop] = campaign[prop] - 1;
            }
          } else if (prop === 'votes') {
            updateData[prop] = campaign[prop];
            // updateData[prop] === [{ candidateId: intVotes }]
            // candidateObj === { candidateId: intVotes }
            updateData[prop].forEach((candidateObj) => {
              Object.keys(candidateObj).forEach((candidateId) => {
                const candidateIndex = updateData[prop].findIndex(
                  candidate => Object.prototype.hasOwnProperty.call(candidate, candidateId),
                );
                if (candidateIndex === -1) {
                  updateData[prop].push({ [candidateId]: 1 });
                } else {
                  const candidateData = req.body[prop][candidateId];
                  if (typeof candidateData === 'string') {
                    if (candidateData === '++') {
                      // eslint-disable-next-line
                      ++updateData[prop][candidateIndex][candidateId];
                    } else if (candidateData === '--') {
                      // eslint-disable-next-line
                      --updateData[prop][candidateIndex][candidateId];
                    }
                  } else {
                    updateData[prop][candidateIndex] = candidateData;
                  }
                }
              });
            });
          } else {
            updateData[prop] = req.body[prop];
          }
        } else {
          updateData[prop] = campaign[prop];
        }
      });
      updateExistingById(campaignId, updateData, (err2, updatedCampaign) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedCampaign);
        }
      });
    }
  });
};
