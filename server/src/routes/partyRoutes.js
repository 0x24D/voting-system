import {
  getPartyById,
} from '../controllers/partyController';

const partyRoutes = (app) => {
  app.route('/api/v1/parties/:id')
    .get(getPartyById);
};

export default partyRoutes;
