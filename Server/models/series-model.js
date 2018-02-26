const mongoose = require('mongoose');
const Exercise = require('./exercise-model');
const Elements = require('./element-model');

const seriesSchema = mongoose.Schema({
  breaks: Number,
  exercises: {
    type: [mongoose.Schema.Types.Mixed],
    required: true
  }
}, {
  collection: 'trainings',
  strict: true
});

var Series = mongoose.model('Series', seriesSchema);
module.exports = Series;
module.exports.schema = seriesSchema;
