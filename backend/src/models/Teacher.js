const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  specialization: { type: String },
  hireDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
