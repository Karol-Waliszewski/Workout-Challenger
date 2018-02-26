'use strict';

var mongoose = require('mongoose');
const Task = require('../models/task-model');
const User = {
  local: require('../models/user-model-local'),
  facebook: require('../models/user-model-facebook')
};
const Functions = require('../config/functions');

exports.list_all = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  },'data').then(user => {
    Functions.successfulRes(res, '', user.data.tasks);
  });
};

exports.add = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    let newTask = new Task({
      training: req.body.training,
      start: req.body.start,
      duration: req.body.duration,
    });
    if (typeof req.body.title != 'undefined')
      newTask.title = req.body.title;
    if (user.data.tasks.every((element) => {
        return element.start + element.duration < newTask.start || newTask.start + newTask.duration < element.start;
      })) {
      user.data.tasks.push(newTask);
      user.save();
      Functions.successfulRes(res, 'Task has been successfully added.');
    } else {
      Functions.unsuccessfulRes(res, 'You have got another task by this time being.');
    }
  });
};

exports.update = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    if (typeof req.body.task == 'undefined')
      Functions.unsuccessfulRes(res, 'Insert updated task.');
    if (user.data.tasks.every((element) => {
        return element.start + element.duration < req.body.task.start || req.body.task.start + req.body.task.duration < element.start || element._id == req.body.task._id || typeof req.body.task.start == 'undefined' || typeof req.body.task.duration == 'undefined';
      })) {
      // Updating user's tasks
      let task = user.data.tasks.id(req.body.task._id);
      let taskIndex = user.data.tasks.indexOf(task);
      // TODO Validacja
      user.data.tasks[taskIndex].set(req.body.task);
      // Saving updated user
      user.save();
      Functions.successfulRes(res, 'Task has been successfully updated.');
    } else {
      Functions.unsuccessfulRes(res, 'You have got another task by this time being.');
    }
  });
};

exports.delete = function(req, res){
  User[res.locals.user.type].findOne({
    _id: res.locals.user._id
  }).then(user => {
    if (req.body.taskID) {
      user.data.tasks.pull({
        _id: req.body.taskID
      });
      user.save();
      Functions.successfulRes(res, 'Task has been successfully deleted.');
    } else {
      Functions.unsuccessfulRes(res, 'You have to set task ID');
    }
  });
};
