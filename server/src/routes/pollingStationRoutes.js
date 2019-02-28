import {
    getPollingStationById,
  } from '../controllers/pollingStationController';
  
  const pollingStationRoutes = (app) => {
    app.route('/api/v1/pollingStations/:id')
      .get(getPollingStationById);
  };
  
  export default pollingStationRoutes;
  