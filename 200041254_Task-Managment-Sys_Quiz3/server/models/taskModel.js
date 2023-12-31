const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
