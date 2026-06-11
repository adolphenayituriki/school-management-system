const router = require('express').Router();
const ctrl = require('../controllers/courseController');

/**
 * @openapi
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/courses/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Get course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course found
 *       404:
 *         description: Course not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/courses:
 *   post:
 *     tags: [Courses]
 *     summary: Create a course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               code:
 *                 type: string
 *               description:
 *                 type: string
 *               credits:
 *                 type: number
 *               teacherId:
 *                 type: string
 *               classId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/courses/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Update a course
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
 *         description: Course updated
 *       404:
 *         description: Course not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/courses/{id}:
 *   delete:
 *     tags: [Courses]
 *     summary: Delete a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted
 *       404:
 *         description: Course not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
