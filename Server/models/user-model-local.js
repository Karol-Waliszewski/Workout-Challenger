const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Task = require('./task-model');
const Goal = require('./goal-model');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  data: {
    tasks: [Task.schema],
    goals: [Goal.schema]
  }
}, {
  collection: 'users-local',
  strict: true
});

userSchema.pre('save', async function(next) {
  try {
    if (!this.password.includes('$2a$10$')) {
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var User = mongoose.model('User-Local', userSchema);
module.exports = User;
