import {
  getAddressById, 
  getAddresses,
} from '../controllers/addressController';

const addressRoutes = (app) => {
  app.route('/api/v1/addresses')
    .get(getAddresses);
  app.route('/api/v1/addresses/:id')
    .get(getAddressById);
};

export default addressRoutes;
