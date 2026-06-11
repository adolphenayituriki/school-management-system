const router = require('express').Router();
const ctrl = require('../controllers/attendanceController');

/**
 * @openapi
 * /api/attendance:
 *   get:
 *     tags: [Attendance]
 *     summary: Get all attendance records
 *     responses:
 *       200:
 *         description: List of attendance records
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/attendance/{id}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance record found
 *       404:
 *         description: Attendance record not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/attendance/student/{studentId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance by student ID
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance records found
 */
router.get('/student/:studentId', ctrl.getByStudent);

/**
 * @openapi
 * /api/attendance/course/{courseId}:
 *   get:
 *     tags: [Attendance]
 *     summary: Get attendance by course ID
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance records found
 */
router.get('/course/:courseId', ctrl.getByCourse);

/**
 * @openapi
 * /api/attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Create an attendance record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               courseId:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [Present, Absent, Late, Excused]
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Attendance record created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/attendance/{id}:
 *   put:
 *     tags: [Attendance]
 *     summary: Update an attendance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Attendance record updated
 *       404:
 *         description: Attendance record not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/attendance/{id}:
 *   delete:
 *     tags: [Attendance]
 *     summary: Delete an attendance record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance record deleted
 *       404:
 *         description: Attendance record not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
