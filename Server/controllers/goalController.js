'use strict';

var mongoose = require('mongoose');
const Goal = require('../models/goal-model');
const User = {
  local: require('../models/user-model-local'),
  facebook: require('../models/user-model-facebook')
};
const Functions = require('../config/functions');

exports.find = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }, 'data').then(user => {
    Functions.successfulRes(res, '', user.data.goals);
  });
};

exports.add = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    let newGoal = new Goal({
      element: req.body.element,
      date: req.body.date
    });
    // TODO VALIDATION
    user.data.goals.push(newGoal);
    user.save();
    Functions.successfulRes(res, 'Goal has been successfully added.');
  });
};

exports.update = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    if (typeof req.body.goal != 'undefined')
      Functions.unsuccessfulRes(res, 'Insert updated goal.');
    // Updating user's goals
    let goal = user.data.goals.id(req.body.goal._id);
    let goalIndex = user.data.goals.indexOf(goal);
    // TODO Validacja
    user.data.goals[goalIndex].set(req.body.goal);
    // Saving updated user
    user.save();
    Functions.successfulRes(res, 'Goal has been successfully updated.');
  });
};

exports.put = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    if (typeof req.body.goal != 'undefined')
      Functions.unsuccessfulRes(res, 'Insert updated goal.');
    // Updating user's goals
    let goal = user.data.goals.id(req.body.goal._id);
    let goalIndex = user.data.goals.indexOf(goal);
    // TODO Validacja
    user.data.goals[goalIndex].set(req.body.goal);
    // Saving updated user
    user.save();
    Functions.successfulRes(res, 'Goal has been successfully updated.');
  });
};

exports.delete = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    if (req.body.goalID) {
      user.data.goals.pull({
        _id: req.body.goalID
      });
      user.save();
      Functions.successfulRes(res, 'Goal has been successfully deleted.');
    } else {
      Functions.unsuccessfulRes(res, 'You have to set goal ID');
    }
  });
};
