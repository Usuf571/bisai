# ⚔️ BiSAI - Team Quiz Game

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18%2B-black)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0%2B-green)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**BiSAI** - современное веб-приложение для проведения командных викторин с анимацией "Tug of War" (перетягивание каната).

![BiSAI Screenshot](https://via.placeholder.com/800x400?text=BiSAI+Game+Screenshot)

## 🎯 Особенности

- 🎮 **Командные игры** - 1v1 или многопользовательские викторины
- 🎨 **Визуальная механика** - Анимация каната показывает преимущество команды
- 👤 **Управление пользователями** - Регистрация, логирование, профили
- 📝 **Создание тестов** - Учителя создают свои викторины
- ⚡ **Реал-тайм** - Мгновенное обновление счета
- 📱 **Адаптивный дизайн** - Работает на всех устройствах
- 🐳 **Docker** - Один клик для запуска
- ☁️ **Облачный хостинг** - Готово для Heroku, Railway, DigitalOcean

## 🚀 Быстрый старт

### Требования
- Node.js 16+ ([скачать](https://nodejs.org/))
- MongoDB 4.4+ ([скачать](https://www.mongodb.com/try/download/community) или использовать [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Docker (опционально, для контейнеризации)

### Установка (3 минуты)

#### Способ 1️⃣: С Docker (самый легкий)

```bash
git clone https://github.com/yourusername/bisai.git
cd bisai
docker-compose up
```

Откройте: http://localhost:3000

---

#### Способ 2️⃣: Локально

```bash
# 1. Клонировать
git clone https://github.com/yourusername/bisai.git
cd bisai

# 2. Установить зависимости
npm install

# 3. Настроить переменные окружения
cp .env.example .env

# 4. Запустить
npm start
```

Откройте: http://localhost:3000

---

## 📖 Использование

### 1. Регистрация
- Нажмите "Register"
- Заполните форму (username, email, пароль)
- Готово! Вы залогинены

### 2. Создание теста
- Нажмите "Create Test"
- Введите название, описание, сложность
- Добавьте вопросы с вариантами ответов
- Отметьте правильные ответы
- Опубликуйте тест

### 3. Игра
- На главной странице нажмите "Play Now" на тесте
- Введите названия команд (Red Team, Blue Team)
- Ответьте на вопросы
- Следите за анимацией каната
- Смотрите результаты

## 🏗️ Архитектура

```
┌─────────────────────────────────────┐
│         ФРОНТЕНД (HTML/CSS/JS)      │
│     - index.html                    │
│     - main-new.js (API клиент)     │
│     - tug-of-war.js (анимация)     │
└──────────────┬──────────────────────┘
               │ fetch/AJAX
               ↓
┌─────────────────────────────────────┐
│       БЭКЕНД (Express.js)           │
│     - /api/auth/* (авторизация)    │
│     - /api/tests/* (тесты)         │
│     - /api/games/* (игры)          │
└──────────────┬──────────────────────┘
               │ Mongoose
               ↓
┌─────────────────────────────────────┐
│        БД (MongoDB)                 │
│     - users (пользователи)          │
│     - tests (викторины)             │
│     - gamesessions (игры)           │
└─────────────────────────────────────┘
```

## 📡 API Endpoints

### Авторизация
```
POST   /api/auth/register       Регистрация
POST   /api/auth/login          Вход
GET    /api/auth/profile        Профиль (JWT)
PUT    /api/auth/profile        Обновить (JWT)
```

### Тесты
```
GET    /api/tests/list          Опубликованные тесты
GET    /api/tests/:id           Один тест
POST   /api/tests               Создать (JWT)
PUT    /api/tests/:id           Обновить (JWT)
DELETE /api/tests/:id           Удалить (JWT)
POST   /api/tests/:id/questions        Добавить вопрос (JWT)
DELETE /api/tests/:id/questions/:qid   Удалить вопрос (JWT)
POST   /api/tests/:id/publish          Опубликовать (JWT)
GET    /api/tests/my/tests             Мои тесты (JWT)
```

### Игры
```
POST   /api/games/session              Создать сессию (JWT)
GET    /api/games/session/:code        Информация об игре
POST   /api/games/session/:code/players        Добавить игрока
POST   /api/games/session/:code/start          Начать (JWT)
GET    /api/games/session/:code/question       Текущий вопрос
POST   /api/games/session/:code/answer         Отправить ответ
POST   /api/games/session/:code/next           Следующий вопрос
GET    /api/games/session/:code/state          Состояние игры
GET    /api/games/session/:code/results        Результаты
```

## 🔐 Безопасность

- **JWT токены** для авторизации
- **bcryptjs** для хеширования паролей
- **CORS** для контроля доступа
- **Helmet.js** для заголовков безопасности
- **Валидация входных данных** на сервере

## 📊 Технологический стек

### Backend
- **Node.js** 18+ - JavaScript runtime
- **Express.js** - Веб-фреймворк
- **MongoDB** - NoSQL база данных
- **Mongoose** - ODM для MongoDB
- **JWT** - Авторизация
- **bcryptjs** - Хеширование паролей
- **Helmet** - Безопасность
- **CORS** - Кросс-доменные запросы

### Frontend
- **HTML5** - Семантическая разметка
- **CSS3** - Отзывчивый дизайн
- **Vanilla JavaScript** - Без фреймворков
- **Canvas API** - Анимация каната
- **Fetch API** - HTTP запросы

### DevOps
- **Docker** - Контейнеризация
- **Docker Compose** - Оркестрация
- **GitHub Actions** - CI/CD

## 📂 Структура проекта

```
bisai/
├── src/                    # Серверный код
│   ├── server.js          # Express приложение
│   ├── config/
│   │   ├── env.js         # Конфигурация
│   │   └── database.js    # MongoDB
│   ├── models/
│   │   ├── User.js
│   │   ├── Test.js
│   │   └── GameSession.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── testController.js
│   │   └── gameController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── tests.js
│   │   └── game.js
│   └── middleware/
│       ├── auth.js
│       └── validation.js
├── public/
│   ├── index.html
│   └── assets/
│       ├── css/main.css
│       └── js/
│           ├── main-new.js
│           └── tug-of-war.js
├── package.json
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

## 🚢 Развертывание

### На Heroku

```bash
heroku create bisai-app
heroku addons:create mongolab:sandbox
git push heroku main
```

### На Railway

```bash
npm install -g @railway/cli
railway login
railway link
railway up
```

### На DigitalOcean

```bash
# 1. Создать Droplet
# 2. Установить Node.js и MongoDB
# 3. Клонировать репо и npm install
# 4. npm start или docker-compose up
```

### На GitHub Pages + Vercel

Фронтенд на GitHub Pages, бэкенд на Vercel:

```bash
# Обновить API_URL в main-new.js
const API_URL = 'https://bisai-api.vercel.app/api';
```

## 🐛 Решение проблем

| Проблема | Решение |
|----------|---------|
| `npm: command not found` | Установить Node.js (https://nodejs.org) |
| `MongoDB connection error` | Запустить MongoDB или использовать MongoDB Atlas |
| `Port 3000 already in use` | `PORT=3001 npm start` |
| `Cannot find module` | `npm install` |
| `CORS error` | Проверить CORS_ORIGIN в .env |

**Подробнее:** смотрите NODE_SETUP.md

## 📚 Документация

- 📄 [START_HERE.md](START_HERE.md) - Быстрый старт
- 📘 [NODE_SETUP.md](NODE_SETUP.md) - Подробная инструкция
- 📗 [README_NODE.md](README_NODE.md) - API документация
- 📙 [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Миграция с PHP
- 📕 [CHECKLIST.md](CHECKLIST.md) - Список файлов

## 💡 Примеры использования

### Регистрация

```javascript
const res = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john',
    email: 'john@example.com',
    password: 'password123'
  })
});
const { token, user } = await res.json();
localStorage.setItem('token', token);
```

### Создание теста

```javascript
const res = await fetch('/api/tests', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Математика',
    description: 'Базовые операции',
    difficulty: 'easy'
  })
});
const test = await res.json();
```

### Запуск игры

```javascript
const res = await fetch('/api/games/session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    testId: testId,
    teamRedName: 'Красные',
    teamBlueName: 'Синие'
  })
});
const { code } = await res.json();
// Использовать code для игры
```

## 🎓 Обучение

Если новичок в используемых технологиях:

- 📖 [Express.js Documentation](https://expressjs.com/)
- 📖 [Mongoose Documentation](https://mongoosejs.com/)
- 📖 [JWT](https://jwt.io/)
- 📖 [Docker Documentation](https://docs.docker.com/)
- 📖 [MongoDB Documentation](https://docs.mongodb.com/)

## 🤝 Вклад

Контрибьюции приветствуются! 

1. Fork репо
2. Создайте feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE)

## 👨‍💻 Автор

**BISAI Team** - Команда разработчиков BiSAI

## ❓ Вопросы?

- 📧 Email: support@bisai.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/bisai/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/bisai/discussions)

## 🎊 Спасибо!

Спасибо за использование BiSAI! Если нравится проект, дайте ⭐ на GitHub.

---

**Made with ❤️ by BISAI Team**

*последнее обновление: 2025-12-10*
