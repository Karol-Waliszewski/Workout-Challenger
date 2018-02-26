const mongoose = require('mongoose');
const Task = require('./task-model');
const Goal = require('./goal-model');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  facebookID: {
    type: String,
    required: true
  },
  data: {
    tasks: [Task.schema],
    goals: [Goal.schema]
  }
}, {
  collection: 'users-facebook',
  strict: true
});

var User = mongoose.model('User-Facebook', userSchema);
module.exports = User;
