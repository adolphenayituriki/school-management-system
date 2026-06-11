const router = require('express').Router();
const ctrl = require('../controllers/gradeController');

/**
 * @openapi
 * /api/grades:
 *   get:
 *     tags: [Grades]
 *     summary: Get all grades
 *     responses:
 *       200:
 *         description: List of grades
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/grades/{id}:
 *   get:
 *     tags: [Grades]
 *     summary: Get grade by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade found
 *       404:
 *         description: Grade not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/grades/student/{studentId}:
 *   get:
 *     tags: [Grades]
 *     summary: Get grades by student ID
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grades found
 */
router.get('/student/:studentId', ctrl.getByStudent);

/**
 * @openapi
 * /api/grades:
 *   post:
 *     tags: [Grades]
 *     summary: Create a grade
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
 *               score:
 *                 type: number
 *               grade:
 *                 type: string
 *                 enum: [A, B, C, D, F]
 *               examType:
 *                 type: string
 *                 enum: [Midterm, Final, Quiz, Assignment]
 *     responses:
 *       201:
 *         description: Grade created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/grades/{id}:
 *   put:
 *     tags: [Grades]
 *     summary: Update a grade
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
 *         description: Grade updated
 *       404:
 *         description: Grade not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/grades/{id}:
 *   delete:
 *     tags: [Grades]
 *     summary: Delete a grade
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Grade deleted
 *       404:
 *         description: Grade not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
