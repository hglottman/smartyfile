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

var dayInMilliseconds = 1000 * 60 * 60 * 24;
setInterval(function() { usersDataFetch() },dayInMilliseconds );

// a function to get all the relevent files, and notes from the user. this funtion will use the nodemailer function to send the user a file.
function usersDataFetch() {

  let users;
  let currentDate = new Date();

  usersModel.getAllUsers().then(allUsers => {
    users = Object.keys(allUsers).map(i => allUsers[i]);
    for (let i = 0; i < users.length; i++) {
      foldersModel.getUserFolders(users[i].user_id).then(userFolders => {
        for (let j = 0; j < userFolders.length; j++) {
          fileModel.getAllFiles(userFolders[j].folder_id).then(relevantFiles => {
            if (relevantFiles !== undefined) {
              for (k = 0; k < relevantFiles.length; k++) {
                let fileDate = new Date(relevantFiles[k].end_date)
                console.log(fileDate)
                
                fileDate.setDate(fileDate.getDate() + 5);
                console.log(fileDate)
                if (fileDate.getFullYear() === currentDate.getFullYear() &&
                  fileDate.getMonth() === currentDate.getMonth() &&
                  fileDate.getDate() === currentDate.getDate()) {
                  let emailInfo = {
                    usersEmail: users[i].email_adress,
                    fileNote: relevantFiles[k].notes,
                    fileName: relevantFiles[k].file_name,
                    fileEndDate: relevantFiles[k].end_date,
                  }
                  automaticMailSender(emailInfo)
                }

              }
            }
          })
        }
      })
    }
  })
}
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
    to: emailInfo.email_adress,
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

// usersDataFetch();

