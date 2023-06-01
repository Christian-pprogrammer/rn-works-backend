const mongoose = require('mongoose');
const equipmentSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: String,
  },
  dateOfAcquisition: {
    type: String
  }
})

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;