import {
  findByProperty,
} from '../db/userAccess';

import nodemailer from 'nodemailer';
var fs = require('fs');
var config = JSON.parse(fs.readFileSync("config.json"));

export const sendEmail = (req, res) => {

    findByProperty('id', req.body.id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(config.details.user)
      console.log(config.details.pass)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.details.user,
            pass: config.details.pass,
        }
    });
    
    var mailOptions = {
      to: user.email,
      subject: req.body.subject,
      text: req.body.text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
});
};