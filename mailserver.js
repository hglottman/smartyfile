const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const router = express.Router();
const fileModel = require('./server/dataAccess/file');
const usersModel = require('./server/dataAccess/users');
const foldersModel = require('./server/dataAccess/folders')
const app = express();
var nodemailer = require('nodemailer');

// a function to get all the relevent files, and notes from the user. this funtion will use the nodemailer function to send the user a file.
function usersDataFetch() {

  let users;
  let dateToFetch = new Date();
  dateToFetch.setDate(dateToFetch.getDate() - 5)
  console.log(dateToFetch);
  let fileDate = new Date();

  usersModel.getAllUsers().then(allUsers => {
    users = Object.keys(allUsers).map(i => allUsers[i]);
    for (let i = 0; i < users.length; i++) {
      foldersModel.getUserFolders(users[i].user_id).then(userFolders => {
        for (let j = 0; j < userFolders.length; j++) {
          fileModel.getAllFiles(userFolders[j].folder_id).then(relevantFiles => {
            if (relevantFiles !== undefined) {
              for (k = 0; k < relevantFiles.length; k++) {
                let d = new Date(relevantFiles[k].end_date)
                d.setDate(d.getDate() - 5);             
                if (d.getDate() === dateToFetch.getDate()) {
                  let emailInfo = {
                    usersEmail: users[i].email_adress,
                    fileNote: relevantFiles[k].notes,
                    fileName: relevantFiles[k].file_name,
                    fileEndDate: relevantFiles[k].end_date,
                  }
                  // automaticMailSender(emailInfo)
                  // need to fix timezones, and date format. might swich to moments.js
                }

              }
            }
          })
        }
      })
    }
  })
}

// usersDataFetch();

// ---------------------------------------------------------------------------------------------------------

const port = process.env.PORT || '8080';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));

module.exports = router;


function automaticMailSender(emailInfo) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'smartyfile9000@gmail.com',
      pass: '123!@#qwe'
    }
  });

  var mailOptions = {
    from: 'smartyfile9000@gmail.com',
    to: 'tal1faran@gmail.com',
    subject: 'This is a Smartyfile reminder for: ' + emailInfo.fileName + ', that will end in: ' + emailInfo.fileEndDate,
    text: emailInfo.fileNote
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

