const Course = require('../models/Course');

exports.getAll = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('teacherId').populate('classId');
    res.json(courses);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacherId').populate('classId');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json({ message: 'Course deleted' });
  } catch (err) { next(err); }
};
