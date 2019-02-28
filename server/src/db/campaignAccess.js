import Campaign from '../models/campaignModel';

export const findAll = (constituency, callback) => {
  let findTerm = {};
  if (constituency) {
    findTerm = { constituencies: constituency };
  }
  Campaign.find(findTerm).lean().exec((err, campaigns) => {
    callback(err, campaigns);
  });
};

export const findById = (campaignId, callback) => {
  Campaign.findById(campaignId).lean().exec((err, campaign) => {
    callback(err, campaign);
  });
};
