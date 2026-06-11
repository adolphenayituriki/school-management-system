const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const getSwaggerSpec = require('./config/swagger');

const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const classRoutes = require('./routes/classRoutes');
const courseRoutes = require('./routes/courseRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = { swaggerOptions: { url: '/api/swagger.json' } };
app.get('/api/swagger.json', (req, res) => {
  const spec = getSwaggerSpec(`${req.protocol}://${req.get('host')}`);
  res.json(spec);
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'School Management API is running' });
});

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use(errorHandler);

module.exports = app;
