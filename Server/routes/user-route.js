var express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport');
var JWT = require('jsonwebtoken');
var router = express.Router();
const User = {
  local: require('../models/user-model-local'),
  facebook: require('../models/user-model-facebook')
};
const Functions = require('../config/functions');

router.use(expressValidator());

router.get('/get/:token', Functions.validateRequest, (req, res) => {
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }, ['name', 'email']).then((user) => {
    //TODO Zrob routy requestowe acceptowe itd, pojdzie z gorki
    // Zobacz w konsoli ze console.log zwraca [Function] CZYLI plugin chodzi :D
    console.log(user.friendRequest)
      Functions.successfulRes(res, '', user);
  });
});

router.put('/update', Functions.validateRequest, (req, res) => {
  //Check if user exist
    User[res.locals.user.type].findOne({_id:res.locals.user._id}, (err)=>{
    if(err){
      Functions.unsuccessfulRes(res, 'User doesn\'t found');
    }
  });

  // Password Updating
  if (req.body.oldPassword && req.body.newPassword) {
    req.checkBody('oldPassword', 'Enter old password').notEmpty();
    req.checkBody('newPassword', 'Enter new password').notEmpty();
    req.checkBody('newPassword', 'Password must be 6-16 chars long').isLength({
      min: 6,
      max: 16
    });
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.newPassword);

    // Checking all validations errors
    let errors = req.validationErrors();
    if (errors)
      Functions.errorRes(res,errors);

    User.local.findOne({
      _id: res.locals.user._id
    }).then(foundUser => {
      foundUser.isValidPassword(req.body.oldPassword).then(valid => {
        if (!valid)
          Functions.errorRes(res, [{
            message: 'Current password is invalid'
          }]);
        else {
          foundUser.password = req.body.newPassword;
          foundUser.save();
          Functions.successfulRes(res, 'Password has been updated');
        }
      });
    });
  }

  // Email Updating
  if (req.body.oldEmail && req.body.newEmail) {
    //TODO validation here
    req.checkBody('oldEmail', 'Email is required').notEmpty();
    req.checkBody('newEmail', 'Email is not an email').isEmail();

    // Checking all validations errors
    let errors = req.validationErrors();
    if (errors)
      Functions.errorRes(res,errors);

    User.local.findOneAndUpdate({
      _id: res.locals.user._id,
      email: req.body.oldEmail
    }, {
      $set: {
        email: req.body.newEmail
      }
    }, {
      setDefaultsOnInsert: true,
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else {
        Functions.successfulRes(res, 'Email has been updated');
      }
    })
  }
  setTimeout(() => {
    // If data is missing
    Functions.unsuccessfulRes(res, 'Insert updated data first!');
  }, 500)
});

router.post('/register', (req, res) => {
  // Getting data
  const name = req.body.name;
  const login = req.body.login;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('login', 'Login must be 6-16 chars long').isLength({
    min: 6,
    max: 16
  });
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not an email').isEmail();
  req.checkBody('password', 'Password must be 6-16 chars long').isLength({
    min: 6,
    max: 16
  });
  req.checkBody('passwordConfirm', 'Passwords do not match').equals(req.body.password);

  // checking all validations errors
  let errors = req.validationErrors();

  if (errors) {
    Functions.errorRes(res,errors)
  } else {
    // Checking is login already in use
    User.local.findOne({
      login: login
    }).then((user) => {
      if (user) {
        // Sending error that login is in use
        Functions.errorRes(res, [{
          message: 'Login is already in use',param:'login'
        }]);
      } else {
        new User.local({
          name,
          login,
          email,
          password
        }).save().then((freshUser) => {
          Functions.successfulRes(res, 'New user has been created successfully', freshUser);
        }).catch((err) => {
          throw err;
          Functions.errorRes(res, [err]);
        });
      }
    });
  }
});

module.exports = router;
