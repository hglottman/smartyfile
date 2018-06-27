const Sequelize = require('sequelize');
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const userInc = require('./server/dataAccess/users');


// Get our API routes
///////
const loginApi = require('./server/routes/login_api');

const fileApi = require('./server/routes/file_api');
const foldersApi = require('./server/routes/folder_api');


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/docsetup')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//////////
app.use(expressSession({
  secret: 'thisIsASecret',
  resave: false,
  saveUninitialized: false
}));

app.use(expressSession({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//////
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
// Set our api routes
// app.use('/', api)
app.use('/login_api', loginApi);




//////

app.get('/userDetails', function (req, res) {
  res.send(req.user);
});

app.use('/file_api', fileApi);
app.use('/folder_api', foldersApi);


app.get('/userDetails', function (req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
// passport.use(new LocalStrategy(
//   //    { passReqToCallback : true},
//   function (username, password, done) {
//     if ((username === "a") && (password === "a")) {
//       return done(null, {
//         username: username,
//         id: 1
//       });
//     } else {
//       return done(null, false, "Failed to login.");
//     }
//   }
// ));
passport.use(new LocalStrategy(
  function (username, password, done) {
    userInc.getOneUser(username, password).then((user) => {
      // console.log(user.username)
      // if(err){return done(err)}   
      // else if(!user){return done(null,false)
      // if(!user.verifyPassword(password)){return done(null,false)};
      return done(null, user)
    })
  }
))
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     userInc.getOneUser(username,password), function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     })
//   }
// )
//////
// app.post('/login', function(res, req, err){
//   console.log(req)
// })

// app.get('/', function(req, res){
//   res.send("nice")
// })

app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      console.log('err is ' + err);
      return next(err)
    }
    console.log(user)
    res.send(user)
  })(req, res, next)
})

// app.post('/login', passport.authenticate('local', {
//   succesRedirect: 'https://www.walla.com',
//   failRedirect: '/'
// }));
/////
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/error.html'));
});
////

app.use(express.static(path.join(__dirname, 'dist')));
/////
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/error.html'));
});

/**
 * Get port from environment and store in Express.
 */
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
