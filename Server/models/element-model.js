const mongoose = require('mongoose');

const elementSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: String,
  author: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['STATIC', 'DYNAMIC'],
    default: 'STATIC'
  },
  tags: [String],
  // Props which are being used during training creation process
  reps: Number,
  hold: Number,
  weight: Number,

}, {
  collection: 'elements',
  strict: true
});

elementSchema.pre('save', function(next) {
  this.type = this.type.toUpperCase();
  next();
});

var element = mongoose.model('Element', elementSchema);
module.exports = element;
module.exports.schema = elementSchema;
