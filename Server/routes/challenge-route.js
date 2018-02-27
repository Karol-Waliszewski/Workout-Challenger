const express = require('express');
const router = express.Router();
const Challenges = require('../models/challenge-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.post('/add', Functions.validateRequest, (req,res)=>{
    let Challenge = new Challenges({
      author: res.locals.user._id,
      name: req.body.name,
      description: req.body.description,
      reps: req.body.reps
    });

    Challenge.save()
      // Sending callback
      .then(element => {
        Functions.successfulRes(res, 'Challenge\' saved', element);
      })
      .catch(err => {
        Functions.errorRes(res, [err]);
      });
});

module.exports = router;
