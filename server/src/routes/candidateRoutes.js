import {
  getCandidates,
} from '../controllers/candidateController';

const candidateRoutes = (app) => {
  app.route('/api/v1/candidates')
    .get(getCandidates);
};

export default candidateRoutes;
