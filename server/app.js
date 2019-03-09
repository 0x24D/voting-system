import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import addressRoutes from './src/routes/addressRoutes';
import authenticationRoutes from './src/routes/authenticationRoutes';
import campaignRoutes from './src/routes/campaignRoutes';
import candidateRoutes from './src/routes/candidateRoutes';
import constituencyRoutes from './src/routes/constituencyRoutes';
import partyRoutes from './src/routes/partyRoutes';
import pollingStationRoutes from './src/routes/pollingStationRoutes';
import systemRoutes from './src/routes/systemRoutes';
import userRoutes from './src/routes/userRoutes';
import voterRoutes from './src/routes/voterRoutes';
import emailRoutes from './src/routes/emailRoutes';
import nodeMailer from 'nodemailer';

const app = express();

const config = require('./_config');

// mongoose connection
mongoose.Promise = global.Promise;
console.log(`Connecting to DB: ${config.mongoURI[process.env.NODE_ENV]}`);
mongoose.connect(config.mongoURI[process.env.NODE_ENV], {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

addressRoutes(app);
authenticationRoutes(app);
campaignRoutes(app);
candidateRoutes(app);
constituencyRoutes(app);
partyRoutes(app);
pollingStationRoutes(app);
systemRoutes(app);
userRoutes(app);
voterRoutes(app);
emailRoutes(app);


export default app;
