const router = require('express').Router();
const ctrl = require('../controllers/studentController');

/**
 * @openapi
 * /api/students:
 *   get:
 *     tags: [Students]
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: List of students
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Get student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/students:
 *   post:
 *     tags: [Students]
 *     summary: Create a student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/students/{id}:
 *   put:
 *     tags: [Students]
 *     summary: Update a student
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
 *         description: Student updated
 *       404:
 *         description: Student not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/students/{id}:
 *   delete:
 *     tags: [Students]
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
