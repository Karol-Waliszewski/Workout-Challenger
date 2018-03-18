const passport = require('passport');
//const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookStrategy = require('passport-facebook-token');
const Keys = require('./keys');
const User = require('../models/user-model-facebook');

// Serializing user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializing user
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: Keys.facebook.id,
    clientSecret: Keys.facebook.secret,
    //callbackURL: "http://localhost:3000/auth/facebook/redirect",
    profileFields: ['id', 'email', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);

    User.findOne({
      facebookID: profile.id
    }).then((foundUser) => {
      if (!foundUser) {
        new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookID: profile.id
        }).save().then((freshUser) => {
          done(null, freshUser);
        });
      } else {
        done(null, foundUser);
      }
    }).catch((err) => {
      console.log(err)
      done(null, err);
    });
  }
));
