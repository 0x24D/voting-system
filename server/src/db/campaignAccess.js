import Campaign from '../models/campaignModel';

export const findById = (campaignId, callback) => {
  Campaign.findById(campaignId).lean().exec((err, campaign) => {
    callback(err, campaign);
  });
};
