import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { connectDatabase } from './config/database.js';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/tests.js';
import gameRoutes from './routes/game.js';

const app = express();

// Middleware безопасности
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));

// Парсинг JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статические файлы
app.use(express.static('public'));

// API маршруты
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/games', gameRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Главная страница
app.get('/', (req, res) => {
  res.sendFile('public/index.html', { root: '.' });
});

// Обработка ошибок 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Обработка ошибок сервера
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Запуск сервера
async function startServer() {
  try {
    await connectDatabase();
    app.listen(config.port, () => {
      console.log(`✅ Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
