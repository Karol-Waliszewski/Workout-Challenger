const express = require('express');
const router = express.Router();
const Challenges = require('../models/challenge-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.get('/get/:token', Functions.validateRequest, (req,res)=>{
  Challenges.find({
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

router.post('/add', Functions.validateRequest, (req,res)=>{
    let Challenge = new Challenges({
      author: res.locals.user._id,
      name: req.body.name,
      description: req.body.description,
      reps: req.body.reps
    });

    Challenge.save()
      // Sending callback
      .then(challenge => {
        Functions.successfulRes(res, 'Challenge\' saved', challenge);
      })
      .catch(err => {
        Functions.errorRes(res, [err]);
      });
});

router.put('/update/:challengeId', Functions.validateRequest, (req,res)=>{
    Challenges.findOneAndUpdate({_id:req.params.challengeId}, req.body, function(err, challenge) {
    if (err){
       Functions.errorRes(res, [err]);
    }
    else{
       Functions.successfulRes(res, 'Challenge\' saved', challenge);
    }
  });
});

module.exports = router;
