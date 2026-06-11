const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  phone: { type: String },
  enrollmentDate: { type: Date, default: Date.now },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
