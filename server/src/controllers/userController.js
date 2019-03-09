import {
  findByProperty,
  updateExistingByProperty,
} from '../db/userAccess';

export const getUserWithUsername = (req, res) => {
  findByProperty('username', req.params.username, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};

export const editUserWithId = (req, res) => {
  const userId = req.params.id;
  findByProperty('_id', userId, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const updateData = {};
      Object.keys(user).forEach((prop) => {
        if (Object.prototype.hasOwnProperty.call(req.body, prop)) {
          updateData[prop] = req.body[prop];
        } else {
          updateData[prop] = user[prop];
        }
      });
      updateExistingByProperty('_id', userId, updateData, (err2, updatedUser) => {
        if (err2) {
          res.status(500).send(err2);
        } else {
          res.json(updatedUser);
        }
      });
    }
  });
};

// export const emailConfirmation = (req, res) => {
//   findByProperty('email', req.params.email, (err, email) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.json(email);
//     }

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'youremail@gmail.com',
//         pass: 'yourpassword'
//       }
//     });

//     var mailOptions = {
//       from: 'youremail@gmail.com',
//       to: email,
//       subject: 'Sending Email using Node.js',
//       text: 'That was easy!'
//     };

//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

//   });
// }