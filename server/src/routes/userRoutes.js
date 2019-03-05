import {
  getUserWithUsername,
  editUserWithId,
} from '../controllers/userController';

const userRoutes = (app) => {
  app.route('/api/v1/users/:username')
    .get(getUserWithUsername);
  app.route('/api/v1/users/:id')
    .put(editUserWithId);
};

export default userRoutes;
