const express = require('express');
const router = express.Router();
const User = {
  local: require('../models/user-model-local'),
  facebook: require('../models/user-model-facebook')
};
const Functions = require('../config/functions');


router.get('/get/:token', Functions.validateRequest, (req,res)=>{
        let userId = '5a5e2c71c0b1013a907a0c15';

        User[res.locals.user.type].find({_id:userId},(err,user)=>{
          user.getFriends(function (err, friends) {

          //  if (err) throw err;

            res.send('friends', friends);
      });
        });

});

router.post('/add', Functions.validateRequest, (req,res)=>{
    if(req.body.friendId){
      let currentUser = res.locals.user._id;
      User[res.locals.user.type].find({_id:currentUser},(err,user)=>{
        user.friendRequest(req.body.friendId, (err, request)=>{
           if (err) throw err;
           res.send('done');
        });
      });
    }


      //odczytac usera, chyba szukac po username
      //https://www.npmjs.com/package/friends-of-friends
    //  currentUser.friendRequest(req.body.friendId, (err, request)=>{
      //  if (err) throw err;

      // res.send('request', request);
    //   });
    // }
    // else{
    //   res.send('jebac');

});

module.exports = router;
