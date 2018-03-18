const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  time: {
    type: Date,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
}, {
  collection: 'challenges',
  strict: true
});

var challenge = mongoose.model('Challenge', challengeSchema);
module.exports = challenge;
module.exports.schema = challengeSchema;
