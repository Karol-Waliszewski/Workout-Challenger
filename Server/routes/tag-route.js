const express = require('express');
const router = express.Router();
const tagHolders = {
  exercise: require('../models/exercise-model'),
  element: require('../models/element-model'),
  training: require('../models/training-model')
}
//const Keys = require('../config/keys');
const Functions = require('../config/functions');

router.get('/get/:type/:token', Functions.validateRequest, (req, res) => {

  if (req.params.type) {

    // Type validation
    req.params.type = req.params.type.toLowerCase();

    // Removing plural from type
    if (req.params.type.charAt(req.params.type.length - 1) == 's') {
      req.params.type = req.params.type.slice(0, req.params.type.length - 1);
    }

    // Searching for tagHolders
    tagHolders[req.params.type].find({
      $or: [{
        author: res.locals.user._id
      }, {
        author: 'default'
      }]
    },'tags').then(results => {
      let tags = [];
      // Adding tags to send json later
      for (result of results) {
        tags.push(...result.tags);
      }
      tags = new Set(tags);
      if (tags.size > 0)
        // Sending tags
        Functions.successfulRes(res, '', [...tags]);
      else
        Functions.unsuccessfulRes(res, 'No tags yet');
    }).catch(err => {
      Functions.errorRes(res, [err]);
    });
  }
});

module.exports = router;
