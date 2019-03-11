import {
  addNewAddress,
  getAddressById,
} from '../controllers/addressController';

const addressRoutes = (app) => {
  app.route('/api/v1/addresses')
    .post(addNewAddress);
  app.route('/api/v1/addresses/:id')
    .get(getAddressById);
};

export default addressRoutes;
