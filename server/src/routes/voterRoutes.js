import {
  addNewVoter,
  getAllVoters,
  getVoterWithId,
  editVoterWithId,
} from '../controllers/voterController';

const voterRoutes = (app) => {
  app.route('/api/v1/voters')
    .get(getAllVoters)
    .post(addNewVoter);
  app.route('/api/v1/voters/:id')
    .get(getVoterWithId)
    .put(editVoterWithId);
};

export default voterRoutes;
