const mongoose = require('mongoose');
const Series = require('./series-model');

const trainingSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  breaks: Number,
  series: {
    type: [Series.schema],
    required: true
  },
  tags: [String]
}, {
  collection: 'trainings',
  strict: true
});

var Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
module.exports.schema = trainingSchema;
