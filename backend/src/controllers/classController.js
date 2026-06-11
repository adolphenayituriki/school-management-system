const Class = require('../models/Class');

exports.getAll = async (req, res, next) => {
  try {
    const classes = await Class.find().populate('teacherId');
    res.json(classes);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const cls = await Class.findById(req.params.id).populate('teacherId');
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const cls = await Class.create(req.body);
    res.status(201).json(cls);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const cls = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json(cls);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const cls = await Class.findByIdAndDelete(req.params.id);
    if (!cls) return res.status(404).json({ message: 'Class not found' });
    res.json({ message: 'Class deleted' });
  } catch (err) { next(err); }
};
