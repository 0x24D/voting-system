import {
  loginUser,
  logoutUser,
} from '../controllers/authenticationController';

const authenticationRoutes = (app) => {
  app.route('/api/v1/authentication/login')
    .post(loginUser);
  app.route('/api/v1/authentication/logout')
    .post(logoutUser);
};

export default authenticationRoutes;
