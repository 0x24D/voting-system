import {
  getConstituencyById,
} from '../controllers/constituencyController';

const constituencyRoutes = (app) => {
  app.route('/api/v1/constituencies/:id')
    .get(getConstituencyById);
};

export default constituencyRoutes;
