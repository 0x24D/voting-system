import Campaign from '../models/campaignModel';

export const findAll = (callback) => {
  Campaign.find({}).lean().exec((err, campaigns) => {
    callback(err, campaigns);
  });
};

export const findById = (campaignId, callback) => {
  Campaign.findById(campaignId).lean().exec((err, campaign) => {
    callback(err, campaign);
  });
};
