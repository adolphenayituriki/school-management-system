const router = require('express').Router();
const ctrl = require('../controllers/teacherController');

/**
 * @openapi
 * /api/teachers:
 *   get:
 *     tags: [Teachers]
 *     summary: Get all teachers
 *     responses:
 *       200:
 *         description: List of teachers
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/teachers/{id}:
 *   get:
 *     tags: [Teachers]
 *     summary: Get teacher by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher found
 *       404:
 *         description: Teacher not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/teachers:
 *   post:
 *     tags: [Teachers]
 *     summary: Create a teacher
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
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *               address:
 *                 type: string
 *               specialization:
 *                 type: string
 *     responses:
 *       201:
 *         description: Teacher created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/teachers/{id}:
 *   put:
 *     tags: [Teachers]
 *     summary: Update a teacher
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
 *         description: Teacher updated
 *       404:
 *         description: Teacher not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/teachers/{id}:
 *   delete:
 *     tags: [Teachers]
 *     summary: Delete a teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted
 *       404:
 *         description: Teacher not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
