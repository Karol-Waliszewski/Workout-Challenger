const mongoose = require('mongoose');
const Training = require('./training-model');

const taskSchema = mongoose.Schema({
  training: {
    required: true,
    type: Training.schema
  },
  title: {
    type: String
  },
  start: {
    type: Number,
    min: 1,
    max: 24,
    required: true,
  },
  duration: {
    type: Number,
    min: 1,
    required: true,
    default: 1
  }

}, {
  strict: true
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
module.exports.schema = taskSchema;
