import {
  addNewVoter,
  getVoterWithId,
  editVoterWithId,
} from '../controllers/voterController';

const voterRoutes = (app) => {
  app.route('/api/v1/voters/')
    .post(addNewVoter);
  app.route('/api/v1/voters/:id')
    .get(getVoterWithId)
    .put(editVoterWithId);
};

export default voterRoutes;
