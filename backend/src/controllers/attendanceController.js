const Attendance = require('../models/Attendance');

exports.getAll = async (req, res, next) => {
  try {
    const records = await Attendance.find().populate('studentId').populate('courseId');
    res.json(records);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const record = await Attendance.findById(req.params.id).populate('studentId').populate('courseId');
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    res.json(record);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const record = await Attendance.create(req.body);
    res.status(201).json(record);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    res.json(record);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const record = await Attendance.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    res.json({ message: 'Attendance record deleted' });
  } catch (err) { next(err); }
};

exports.getByStudent = async (req, res, next) => {
  try {
    const records = await Attendance.find({ studentId: req.params.studentId }).populate('courseId');
    res.json(records);
  } catch (err) { next(err); }
};

exports.getByCourse = async (req, res, next) => {
  try {
    const records = await Attendance.find({ courseId: req.params.courseId }).populate('studentId');
    res.json(records);
  } catch (err) { next(err); }
};
