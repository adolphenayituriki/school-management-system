const Grade = require('../models/Grade');

exports.getAll = async (req, res, next) => {
  try {
    const grades = await Grade.find().populate('studentId').populate('courseId');
    res.json(grades);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const grade = await Grade.findById(req.params.id).populate('studentId').populate('courseId');
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json(grade);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const grade = await Grade.findByIdAndDelete(req.params.id);
    if (!grade) return res.status(404).json({ message: 'Grade not found' });
    res.json({ message: 'Grade deleted' });
  } catch (err) { next(err); }
};

exports.getByStudent = async (req, res, next) => {
  try {
    const grades = await Grade.find({ studentId: req.params.studentId }).populate('courseId');
    res.json(grades);
  } catch (err) { next(err); }
};
