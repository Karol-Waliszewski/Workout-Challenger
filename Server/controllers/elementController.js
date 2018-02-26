'use strict';
const Functions = require('../config/functions');
var mongoose = require('mongoose');
const Elements = require('../models/element-model');

exports.list_all = function(req, res){
  Elements.find({
    $or: [{
      author: res.locals.user._id
    }, {
      author: 'default'
    }]
  }).then(results => {
    Functions.successfulRes(res, '', results);
  }).catch(err => {
    Functions.errorRes(res, [err]);
  });
};

exports.add = function(req, res){
  // Creating a element object and filling in with required data
  let freshElements = new Elements({
    author: res.locals.user._id,
    //author: 'default',
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags || []
  });

  // Checking for optional data
  if (req.body.hasOwnProperty('video'))
    freshElements.video = req.body.video;
  if (req.body.hasOwnProperty('holdable'))
    freshElements.holdable = req.body.holdable;

  // Adding element to database
  freshElements.save()
    // Sending callback
    .then(element => {
      Functions.successfulRes(res, '', element);
    })
    .catch(err => {
      Functions.errorRes(res, [err]);
    });
};

exports.update = function(req, res){
  if (req.body.element) {
    Elements.findOneAndUpdate({
      _id: req.body.element._id,
      author: res.locals.user._id
    }, req.body.element, {
      setDefaultsOnInsert: true
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Element has been updated');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose element');
};

exports.delete = function(req, res){
  if (req.body.elementID) {
    Elements.findOneAndRemove({
      _id: req.body.elementID,
      author: res.locals.user._id
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Element has been deleted');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose element');
};
