import {
  getPartyById,
  addNewParty,
} from '../controllers/partyController';

const partyRoutes = (app) => {
  app.route('/api/v1/parties/:id')
    .get(getPartyById);

  app.route('/api/v1/parties')
    .post(addNewParty);
};

export default partyRoutes;
