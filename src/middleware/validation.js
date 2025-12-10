import { body, validationResult } from 'express-validator';

export function validateRegister() {
  return [
    body('username').notEmpty().withMessage('Username required').isLength({ min: 3 }).withMessage('Min 3 chars'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 chars'),
    body('firstName').optional(),
    body('lastName').optional(),
  ];
}

export function validateLogin() {
  return [
    body('username').notEmpty().withMessage('Username required'),
    body('password').notEmpty().withMessage('Password required'),
  ];
}

export function validateTest() {
  return [
    body('title').notEmpty().withMessage('Title required').isLength({ min: 3 }),
    body('description').optional(),
    body('subject').optional(),
    body('difficulty').isIn(['easy', 'medium', 'hard']),
  ];
}

export function validateQuestion() {
  return [
    body('text').notEmpty().withMessage('Question text required'),
    body('answers').isArray({ min: 2 }).withMessage('At least 2 answers'),
    body('answers.*.text').notEmpty(),
    body('answers.*.isCorrect').isBoolean(),
  ];
}

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
