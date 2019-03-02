import {
  getUserWithId,
  editUserWithId,
} from '../controllers/userController';

const userRoutes = (app) => {
  // route for actions on a specific user
  app.route('/api/v1/users/:id')
  // http get using the getUserWithId method
    .get(getUserWithId)
    .put(editUserWithId);
};

export default userRoutes;
