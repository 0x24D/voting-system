import {
  getPollingStations,
  getPollingStationById,
  addNewPollingStation,
} from '../controllers/pollingStationController';

const pollingStationRoutes = (app) => {
  app.route('/api/v1/pollingStations')
    .get(getPollingStations)
    .post(addNewPollingStation);
  app.route('/api/v1/pollingStations/:id')
    .get(getPollingStationById);
};

export default pollingStationRoutes;
