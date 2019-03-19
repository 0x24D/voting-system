import nodemailer from 'nodemailer';
import {
  findByProperty,
} from '../db/userAccess';

const config = require('../../_config');
/**
 * Gets the Voter using their id which is sent in the request
 * parameters from the database and returns it to the client.
 *
 * Uses Email and Password from _config to create a transporter
 * Uses Email from the Voter and the subject and text sent from
 * the body in Vote.vue
 *
 * @param req the request from the client
 * @param res the repsonse from the server
 */
export const sendEmail = (req, res) => {
  findByProperty('_id', req.body.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (user) {
      const transporter = nodemailer.createTransport(config.email);
      const mailOptions = {
        to: user.email,
        subject: req.body.subject,
        text: req.body.text,
      };
      transporter.sendMail(mailOptions, (sendErr) => {
        if (err) {
          res.status(500).send(sendErr);
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(500).end();
    }
  });
};
