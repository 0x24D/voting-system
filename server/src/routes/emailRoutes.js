import {
  sendEmail,
} from '../controllers/emailController';

/**
 * Creates the route to send emails.
 *
 * @param app the application
*/
const emailRoutes = (app) => {
  app.route('/api/v1/email')
    .post(sendEmail);
};

export default emailRoutes;
