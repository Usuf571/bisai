import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegister(), handleValidationErrors, authController.register);

router.post('/login', validateLogin(), handleValidationErrors, authController.login);

router.get('/profile', authMiddleware, authController.getProfile);

router.put('/profile', authMiddleware, authController.updateProfile);

export default router;
