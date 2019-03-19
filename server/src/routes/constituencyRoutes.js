import {
  getAllConstituencies,
  getConstituencyById,
} from '../controllers/constituencyController';

const constituencyRoutes = (app) => {
  app.route('/api/v1/constituencies')
    .get(getAllConstituencies);
  app.route('/api/v1/constituencies/:id')
    .get(getConstituencyById);
};

export default constituencyRoutes;
