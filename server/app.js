import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import candidateRoutes from './src/routes/candidateRoutes';
import partyRoutes from './src/routes/partyRoutes';

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

candidateRoutes(app);
partyRoutes(app);

export default app;
