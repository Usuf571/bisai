import express from 'express';
import * as testController from '../controllers/testController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';
import { validateTest, validateQuestion, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Публичные маршруты
router.get('/list', optionalAuthMiddleware, testController.listTests);

router.get('/:testId', testController.getTest);

// Защищённые маршруты
router.post('/', authMiddleware, validateTest(), handleValidationErrors, testController.createTest);

router.put('/:testId', authMiddleware, validateTest(), handleValidationErrors, testController.updateTest);

router.post('/:testId/questions', authMiddleware, validateQuestion(), handleValidationErrors, testController.addQuestion);

router.delete('/:testId/questions/:questionId', authMiddleware, testController.deleteQuestion);

router.post('/:testId/publish', authMiddleware, testController.publishTest);

router.delete('/:testId', authMiddleware, testController.deleteTest);

router.get('/my/tests', authMiddleware, testController.getMyTests);

export default router;
