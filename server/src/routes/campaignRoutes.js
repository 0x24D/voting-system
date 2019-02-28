import {
  getCampaigns,
  getCampaignById,
} from '../controllers/campaignController';

const campaignRoutes = (app) => {
  app.route('/api/v1/campaigns')
    .get(getCampaigns);
  app.route('/api/v1/campaigns/:id')
    .get(getCampaignById);
};

export default campaignRoutes;
