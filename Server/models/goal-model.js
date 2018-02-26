const mongoose = require('mongoose');
const Element = require('./element-model');

const goalSchema = mongoose.Schema({
  element: {
    required: true,
    type: Element.schema
  },
  date: {
    type: Date,
    min: new Date()
  }
}, {
  strict: true
});

var Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
module.exports.schema = goalSchema;
