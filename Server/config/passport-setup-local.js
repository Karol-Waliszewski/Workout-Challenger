const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model-local');
const bcrypt = require('bcryptjs');

// Serializing user
passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id);
});

// Deserializing user
passport.deserializeUser((id, done) => {
  console.log(id)
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    session: true // ?
  },
  function(login, password, done) {
    login = login.toLowerCase();
    User.findOne({
      login: login
    }).then((foundUser) => {
      if (!foundUser) {
        return done(null, false);
      } else {
        foundUser.isValidPassword(password).then(valid=>{
          if (valid === true) {
            return done(null, foundUser);
          } else {
            return done(null, false);
          }
        });
      }
    }).catch((err) => {
      done(err);
    });
  }
));
