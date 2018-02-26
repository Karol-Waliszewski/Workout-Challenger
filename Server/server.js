// Requirements
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passportSetup = {
  facebook: require('./config/passport-setup-facebook'),
  local: require('./config/passport-setup-local')
}
var config = require('./config/config');
const keys = require('./config/keys');

// Server init
var server = express();

// Parser init
server.use(cookieParser(keys.session));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: false
}));

// Init session
server.use(session({
  secret: keys.session,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

// Passport Init
server.use(passport.initialize());
server.use(passport.session());


// Connecting to mongoDB Database
mongoose.connect(keys.mongoose.adress, () => {
  console.log('Successfully connected to mongoDB!');
});

// Routes
const Routes = {
  tags: require('./routes/tag-route'),
  tasks: require('./routes/task-route'),
  trainings: require('./routes/training-route'),
  exercises: require('./routes/exercise-route'),
  elements: require('./routes/element-route'),
  user: require('./routes/user-route'),
  auth: require('./routes/authorization-route'),
}

server.use('/tags', Routes.tags);
server.use('/tasks', Routes.tasks);
server.use('/trainings', Routes.trainings);
server.use('/exercises', Routes.exercises);
server.use('/elements', Routes.elements);
server.use('/auth', Routes.auth);
server.use('/user', Routes.user);

server.get('/', (req, res) => {
  res.send('Welcome to Workout Partner Api!');
});

server.listen(config.server.port, function() {
  console.log('Workout Partner is listening on port: ' + config.server.port);
});
