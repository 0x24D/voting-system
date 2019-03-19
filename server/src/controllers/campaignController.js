import {
  addNew,
  findAll,
  findById,
  updateExistingById,
} from '../db/campaignAccess';

/**
 * Add a new campaign to the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const addNewCampaign = (req, res) => {
  const props = ['name', 'total_votes', 'candidates',
    'votes', 'campaign_type',
    'constituencies', 'start_date', 'end_date'];
  const dataToSave = {};
  props.forEach((prop) => {
    if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
      if (prop === 'total_votes') {
        dataToSave[prop] = Number(req.body[prop]);
      } else if (prop === 'votes') {
        const votesData = [];
        // [{candidateId: intVotes}]
        req.body[prop].forEach((obj) => {
          Object.keys(obj).forEach((key) => {
            votesData.push({ [key]: Number(obj[key]) });
          });
        });
        dataToSave[prop] = votesData;
      } else {
        dataToSave[prop] = req.body[prop];
      }
    }
  });
  addNew(dataToSave, (err, campaign) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).json(campaign);
    }
  });
};

/**
 * Get all campaigns from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
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

/**
 * Get the campaign with the passed in ID from the database.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const getCampaignById = (req, res) => {
  findById(req.params.id, (err, campaign) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(campaign);
    }
  });
};

/**
 * Update the campaign with the passed in ID using the submitted data.
 *
 * @param req the request from the client
 * @param res the response to the client
 */
export const editCampaignById = (req, res) => {
  const campaignId = req.params.id;
  findById(campaignId, (err, campaign) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(campaign).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          if (prop === 'votes') {
            updateData[prop] = campaign[prop];
            const candidateId = req.body[prop];
            const candidateIndex = updateData[prop].findIndex(
              candidate => Object.prototype.hasOwnProperty.call(candidate, candidateId),
            );
            if (candidateIndex === -1) {
              updateData[prop].push({ [candidateId]: 1 });
            } else {
              // eslint-disable-next-line
              ++updateData[prop][candidateIndex][candidateId];
            }
          } else if (prop === 'total_votes' && typeof req.body[prop] === 'string') {
            if (req.body[prop] === '++') {
              updateData[prop] = campaign[prop] + 1;
            }
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
