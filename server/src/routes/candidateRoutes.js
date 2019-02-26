import {
  getCandidates,
  getCandidateById,
} from '../controllers/candidateController';

const candidateRoutes = (app) => {
  app.route('/api/v1/candidates')
    .get(getCandidates);

  app.route('/api/v1/candidates/:id')
    .get(getCandidateById);
};

export default candidateRoutes;
