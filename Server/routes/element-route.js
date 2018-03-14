const express = require('express');
const router = express.Router();
const Elements = require('../models/element-model');
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.get('/get/:token', Functions.validateRequest, (req, res) => {
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
  })
});

router.post('/add', Functions.validateRequest, (req, res) => {
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
});

router.put('/update/:id', Functions.validateRequest, (req,res)=>{
  if(req.body.element){
      Elements.findOneAndUpdate({
        _id:req.params.id,
        author: res.locals.user._id
      }, req.body.element, function(err, exercise) {
      if (err){
         Functions.errorRes(res, [err]);
      }
      else{
         Functions.successfulRes(res, 'Element\'s saved', exercise);
      }
    });
  }
  else{
        Functions.unsuccessfulRes(res, 'You have to choose element');
  }
});

router.delete('/delete/:id', Functions.validateRequest, (req, res) => {
    Elements.find({
      _id: req.params.id,
      author: res.locals.user._id
    }).remove((err)=>{
        if(err){
            Functions.errorRes(res, [err]);
        }
        else{
             Functions.successfulRes(res, 'Element\'s deleted');
        }
    })
});


module.exports = router;
