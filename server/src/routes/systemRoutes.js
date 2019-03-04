import {
  getSystems,
  getSystemWithId,
  editSystemWithId,
} from '../controllers/systemController';

const systemRoutes = (app) => {
  app.route('/api/v1/systems')
    .get(getSystems);
  // route for actions on a specific user
  app.route('/api/v1/systems/:id')
  // http get using the getUserWithId method
    .get(getSystemWithId)
    .put(editSystemWithId);
};

export default systemRoutes;