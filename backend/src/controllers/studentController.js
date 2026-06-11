const Student = require('../models/Student');

exports.getAll = async (req, res, next) => {
  try {
    const students = await Student.find().populate('classId');
    res.json(students);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate('classId');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
  } catch (err) { next(err); }
};
