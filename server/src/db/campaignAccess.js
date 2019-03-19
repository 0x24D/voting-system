import Campaign from '../models/campaignModel';

/**
 * Add new data to the database.
 *
 * @param dataToSave the data to save to the database
 * @param callback the function to call after saving the data
 */
export const addNew = (dataToSave, callback) => {
  const newCampaign = new Campaign({});
  Object.keys(dataToSave).forEach((prop) => {
    newCampaign[prop] = dataToSave[prop];
  });
  newCampaign.save((err, campaign) => {
    callback(err, campaign);
  });
};

/**
 * Find all records in the database.
 *
 * @param callback the function to call after finding the data
 */
export const findAll = (constituency, callback) => {
  let findTerm = {};
  if (constituency) {
    findTerm = { constituencies: constituency };
  }
  Campaign.find(findTerm).lean().exec((err, campaigns) => {
    callback(err, campaigns);
  });
};

/**
 * Find a specific record in the database.
 *
 * @param campaignId the ID of the record to find
 * @param callback the function to call after finding the data
 */
export const findById = (campaignId, callback) => {
  Campaign.findById(campaignId).lean().exec((err, campaign) => {
    callback(err, campaign);
  });
};

/**
 * Update a record in the database.
 *
 * @param campaignId the ID of the record to update
 * @param dataToSave the data to store in the record
 * @param callback the function to call after updating the record
 */
export const updateExistingById = (campaignId, dataToSave, callback) => {
  Campaign.findOneAndUpdate({ _id: campaignId }, new Campaign(dataToSave),
    { new: true }, (err, campaign) => {
      callback(err, campaign);
    });
};
