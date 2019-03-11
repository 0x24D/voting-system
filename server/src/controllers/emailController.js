import {
  findByProperty,
} from '../db/userAccess';

import nodemailer from 'nodemailer';
var fs = require('fs');
const emailConfig = JSON.parse(fs.readFileSync("emailConfig.json"));

export const sendEmail = (req, res) => {
  findByProperty('_id', req.body.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (user) {
        const transporter = nodemailer.createTransport(emailConfig);
        var mailOptions = {
          to: user.email,
          subject: req.body.subject,
          text: req.body.text
        };
        transporter.sendMail(mailOptions, function(err){
          if (err) {
          res.status(500).send(err);
          } else {
            res.status(204).end();
          }
        });
      } else {
        res.status(500).end();
      }
    }
  });
};