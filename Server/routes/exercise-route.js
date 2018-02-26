const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.get('/get/:token', Functions.validateRequest, (req, res) => {
  Exercise.find({
    $or: [{
      author: res.locals.user._id
    }, {
      author: 'default'
    }]
  }).then(results => {
    Functions.successfulRes(res, '', results);
  }).catch(err => {
    Functions.errorRes(res, [err]);
  })
});

router.post('/add', Functions.validateRequest, (req, res) => {
  // Creating a exercise object and filling in with required data
  let freshExercise = new Exercise({
    author: res.locals.user._id,
    //author: 'default',
    name: req.body.name,
    description: req.body.description
  });

  // Checking for optional data
  if (req.body.hasOwnProperty('video'))
    freshExercise.video = req.body.video;
  if (req.body.hasOwnProperty('holdable'))
    freshExercise.holdable = req.body.holdable;

  // Adding exercise to database
  freshExercise.save()
    // Sending callback
    .then(exercise => {
      Functions.successfulRes(res, '', exercise);
    })
    .catch(err => {
      Functions.errorRes(res, [err]);
    });
});

router.post('/update', Functions.validateRequest, (req, res) => {
  if (req.body.exercise) {
    Exercise.findOneAndUpdate({
      _id: req.body.exercise._id,
      author: res.locals.user._id
    }, req.body.exercise, {
      setDefaultsOnInsert: true
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Exercise has been updated');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose exercise');
});

router.post('/delete', Functions.validateRequest, (req, res) => {
  if (req.body.exerciseID) {
    Exercise.findOneAndRemove({
      _id: req.body.exerciseID,
      author: res.locals.user._id
    }, (err) => {
      if (err)
        Functions.errorRes(res, [err]);
      else
        Functions.successfulRes(res, 'Exercise has been deleted');
    });
  } else
    Functions.unsuccessfulRes(res, 'You have to choose exercise');
});

module.exports = router;
