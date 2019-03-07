import {
  getAuditorWithId,
} from '../controllers/auditorController';

const auditorRoutes = (app) => {
  app.route('/api/v1/auditors/:id')
    .get(getAuditorWithId);
};

export default auditorRoutes;
