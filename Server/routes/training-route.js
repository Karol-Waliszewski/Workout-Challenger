const express = require('express');
//const JWT = require('jsonwebtoken');
const Training = require('../models/training-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');
const router = express.Router();

router.get('/get/:token', Functions.validateRequest, (req, res) => {
  Training.find({
    author: res.locals.user._id
  }).then(results => {
    Functions.successfulRes(res, '', results);
  }).catch(err => {
    Functions.errorRes(res, [err]);
  })
});

router.post('/add', Functions.validateRequest, (req, res) => {
  // Creating a training object and filling in with required data
  let freshTraining = new Training({
    author: res.locals.user._id,
    title: req.body.title,
    series: req.body.series
  });
  // Checking for optional data
  if (req.body.hasOwnProperty('breaks'))
    freshTraining.breaks = req.body.breaks;

  // Adding training to database
  freshTraining.save()
    // Sending callback
    .then(training => {
      Functions.successfulRes(res, '', training);
    })
    .catch(err => {
      Functions.errorRes(res, [err]);
    });
});

router.put('/update', Functions.validateRequest, (req, res) => {
  if (req.body.training) {
    Training.findOneAndUpdate({
      _id: req.body.training._id,
      author: res.locals.user._id
    }, req.body.training, {
      setDefaultsOnInsert: true
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Training has been updated');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose training');
});

router.delete('/delete', Functions.validateRequest, (req, res) => {
  if (req.body.trainingID) {
    Training.findOneAndRemove({
      _id: req.body.trainingID,
      author: res.locals.user._id
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Training has been deleted');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose training');
});

module.exports = router;
