import {
  addNewCampaign,
  getCampaigns,
  getCampaignById,
  editCampaignById,
} from '../controllers/campaignController';

const campaignRoutes = (app) => {
  app.route('/api/v1/campaigns')
    .get(getCampaigns)
    .post(addNewCampaign);
  app.route('/api/v1/campaigns/:id')
    .get(getCampaignById)
    .put(editCampaignById);
};

export default campaignRoutes;
