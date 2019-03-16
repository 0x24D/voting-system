import {
  addNewAddress,
  getAddressById,
  getAddresses,
} from '../controllers/addressController';

const addressRoutes = (app) => {
  app.route('/api/v1/addresses')
    .post(addNewAddress)
    .get(getAddresses);
  app.route('/api/v1/addresses/:id')
    .get(getAddressById);
};

export default addressRoutes;
