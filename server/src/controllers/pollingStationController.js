import mongoose from 'mongoose';

import { PollingStationSchema } from '../models/pollingStationModel';

const pollingStation = mongoose.model('pollingStation', PollingStationSchema);

//Constituency(name, minimumAge, votingSystem)
export const validateConstituency = (req, res) => {

};