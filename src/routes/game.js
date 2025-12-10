import express from 'express';
import * as gameController from '../controllers/gameController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Создание сессии (нужна авторизация)
router.post('/session', authMiddleware, gameController.createSession);

// Получить сессию (доступно для всех)
router.get('/session/:code', optionalAuthMiddleware, gameController.getSession);

// Добавить игрока (доступно для всех)
router.post('/session/:code/players', optionalAuthMiddleware, gameController.addPlayer);

// Начать игру (только создатель)
router.post('/session/:code/start', authMiddleware, gameController.startGame);

// Получить текущий вопрос
router.get('/session/:code/question', gameController.getCurrentQuestion);

// Отправить ответ
router.post('/session/:code/answer', gameController.submitAnswer);

// Следующий вопрос
router.post('/session/:code/next', gameController.nextQuestion);

// Получить состояние игры
router.get('/session/:code/state', gameController.getGameState);

// Получить результаты
router.get('/session/:code/results', gameController.getGameResults);

export default router;
