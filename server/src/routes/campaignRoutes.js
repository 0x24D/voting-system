import {
  getCampaignById,
} from '../controllers/campaignController';

const campaignRoutes = (app) => {
  app.route('/api/v1/campaigns/:id')
    .get(getCampaignById);
};

export default campaignRoutes;
