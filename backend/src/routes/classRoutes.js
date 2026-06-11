const router = require('express').Router();
const ctrl = require('../controllers/classController');

/**
 * @openapi
 * /api/classes:
 *   get:
 *     tags: [Classes]
 *     summary: Get all classes
 *     responses:
 *       200:
 *         description: List of classes
 */
router.get('/', ctrl.getAll);

/**
 * @openapi
 * /api/classes/{id}:
 *   get:
 *     tags: [Classes]
 *     summary: Get class by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class found
 *       404:
 *         description: Class not found
 */
router.get('/:id', ctrl.getById);

/**
 * @openapi
 * /api/classes:
 *   post:
 *     tags: [Classes]
 *     summary: Create a class
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               section:
 *                 type: string
 *               academicYear:
 *                 type: string
 *               teacherId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Class created
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/classes/{id}:
 *   put:
 *     tags: [Classes]
 *     summary: Update a class
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
 *         description: Class updated
 *       404:
 *         description: Class not found
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/classes/{id}:
 *   delete:
 *     tags: [Classes]
 *     summary: Delete a class
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Class deleted
 *       404:
 *         description: Class not found
 */
router.delete('/:id', ctrl.remove);

module.exports = router;
