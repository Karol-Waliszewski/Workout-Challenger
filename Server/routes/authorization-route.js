const express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport');
var JWT = require('jsonwebtoken');
const url = require('url');
const Keys = require('../config/keys');
const Functions = require('../config/functions');
const router = express.Router();
router.use(expressValidator());


router.get('/', (req, res) => {
  res.send('Auth!');
});

router.post('/local', passport.authenticate('local'), (req, res) => {
  if (req.user) {
    let token = Functions.returnToken(req.user);
    req.logout();
    Functions.successfulRes(res, '', token);
  } else {
    Functions.unsuccessfulRes(res, 'No user found');
  }
});

router.get('/facebook', passport.authenticate('facebook-token', {
  scope: ['public_profile', 'email']
}));

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    let token = Functions.returnToken(req.user);
    req.logout();
    Functions.successfulRes(res,'',token);
  } else {
    Functions.unsuccessfulRes(res, 'No user found');
  }
});

module.exports = router;
