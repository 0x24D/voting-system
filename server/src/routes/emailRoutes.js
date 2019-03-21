import {
  sendEmail,
} from '../controllers/emailController';

const emailRoutes = (app) => {
  app.route('/api/v1/email')
    .post(sendEmail);
};

export default emailRoutes;
