import {
  getSystems,
  getSystemWithId,
} from '../controllers/systemController';

const systemRoutes = (app) => {
  app.route('/api/v1/system')
    .get(getSystems);
  // route for actions on a specific user
  app.route('/api/v1/systems/:systemId')
  // http get using the getUserWithId method
    .get(getSystemWithId);
};

export default systemRoutes;
