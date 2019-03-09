import {
  getUserWithUsername,
  editUserWithId,
  //emailConfirmation,
} from '../controllers/userController';

const userRoutes = (app) => {
  //app.route('/api/v1/users/:email')
  //.post(emailConfirmation)
  app.route('/api/v1/users/:username')
    .get(getUserWithUsername);
  app.route('/api/v1/users/:id')
    .put(editUserWithId);
};

export default userRoutes;
