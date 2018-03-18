const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Keys = require('../config/keys');

//ar unsuccessfulRes = function(message,res) {
var unsuccessfulRes = function(res, message) {
  res.json({
    success: false,
    message: message
  });
};

var successfulRes = function(res, message, data) {
  let json = {
    success: true,
  }
  if (data) {
    json.data = data;
  }
  if (message.length > 1) {
    json.message = message;
  }
  res.json(json);
};

var errorRes = function(res, errors) {
  let errorsArray = [];
  for (error of errors) {
    if (error.msg){
      let err = {
        message: error.msg,
        param: error.param,
        value: error.value
      };
      errorsArray.push(err);
    }
    else
      errorsArray.push(error);
  }
  res.json({
    success: false,
    errors: errorsArray
  });
};

var returnToken = function(user) {
  let data = {
    _id: user._id
  };
  if (typeof user.facebookID != 'undefined')
    data.type = 'facebook';
  else if (typeof user.googleID != 'undefined')
    data.type = 'google';
  else
    data.type = 'local';

  let token = JWT.sign({
    data
  }, Keys.jwt.secret);
  return token;
}

var validateRequest = (req, res, next) => {
  if (req.body.token) {
    JWT.verify(req.body.token, Keys.jwt.secret, (err, user) => {
      if (err) {
        errorRes(res,err);
      } else {
        res.locals.user = user.data;
        next();
      }
    });
  } else if (req.params.token) {
    JWT.verify(req.params.token, Keys.jwt.secret, (err, user) => {
      if (err) {
        errorRes(res,err);
      } else {
        res.locals.user = user.data;
        next();
      }
    });
  } else
    unsuccessfulRes(res,'Insert token!');
};

module.exports.unsuccessfulRes = unsuccessfulRes;
module.exports.successfulRes = successfulRes;
module.exports.errorRes = errorRes;
module.exports.validateRequest = validateRequest;
module.exports.returnToken = returnToken;
