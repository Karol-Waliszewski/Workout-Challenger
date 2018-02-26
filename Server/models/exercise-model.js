const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: String,
  holdable: {
    type: Boolean,
    required: true,
    default: false
  },
  author: {
    type: String,
    required: true
  },
  tags: [String],
  // Props which are being used during training creation process
  reps: Number,
  hold: Number,
  weight: Number,

}, {
  collection: 'exercises',
  strict: true
});

var Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;
module.exports.schema = exerciseSchema;
