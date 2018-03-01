const express = require('express');
const router = express.Router();
const Exercises = require('../models/exercise-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.get('/get/:token', Functions.validateRequest, (req, res) => {
  Exercises.find({
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
  let freshExercise = new Exercises({
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

router.put('/update/:exerciseID', Functions.validateRequest, (req,res)=>{
  if(req.body.exercise){
      Exercises.findOneAndUpdate({
        _id:req.params.exerciseID
      }, req.body.exercise, function(err, exercise) {
      if (err){
         Functions.errorRes(res, [err]);
      }
      else{
         Functions.successfulRes(res, 'Exercise\' saved', exercise);
      }
    });
  }
  else{
        Functions.unsuccessfulRes(res, 'You have to choose exercise');
  }
});


router.delete('/delete/:id', Functions.validateRequest, (req, res) => {
    Exercises.find({_id:req.params.id}).remove((err)=>{
        if(err){
          Functions.errorRes(res, [err]);
        }
        else{
          Functions.successfulRes(res, 'Exercise\'s deleted');
        }
      });
    });


module.exports = router;
