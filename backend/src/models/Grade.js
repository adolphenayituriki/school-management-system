const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F'] },
  examType: { type: String, enum: ['Midterm', 'Final', 'Quiz', 'Assignment'] },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
