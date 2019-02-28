import {
  findAll,
  findById,
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

export const addCampaign = (req, res) => {

};

export const editCampaign = (req, res) => {

};

export const removeCampaign = (req, res) => {

};
