const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  logMessage: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
})

const Log = mongoose.model("Log", logSchema);

module.exports = Log;