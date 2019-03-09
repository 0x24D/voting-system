import {
  getAuditorWithId,
} from '../controllers/auditorController';

/**
 * creates the routes of the auditor
 * @param app the application
  */
const auditorRoutes = (app) => {
  app.route('/api/v1/auditors/:id')
    .get(getAuditorWithId);
};

export default auditorRoutes;
