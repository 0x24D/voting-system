import {
  getCandidates,
  getCandidateById,
  addNewCandidate,
} from '../controllers/candidateController';

const candidateRoutes = (app) => {
  app.route('/api/v1/candidates')
    .get(getCandidates)
    .post(addNewCandidate);

  app.route('/api/v1/candidates/:id')
    .get(getCandidateById);
};

export default candidateRoutes;
