# BiSAI - Node.js Версия (Новая)

Старая PHP версия была переделана на **Node.js + Express + MongoDB**.

## ✨ Что изменилось

### ✅ Оставлено:
- `public/index.html` - главная страница (обновлена)
- `public/assets/css/main.css` - стили (совместимы)
- `public/assets/js/tug-of-war.js` - анимация каната (совместима)
- Логика игры и механика

### ❌ Удалено (PHP версия):
- `config/` - заменены на `src/config/`
- `controllers/` (PHP) - заменены на `src/controllers/`
- `models/` (PHP) - заменены на `src/models/` (Mongoose)
- `includes/` - функции перенесены в middleware
- `public/api.php` - заменен на Express маршруты
- `public/login.php` - встроено в `index.html`

### 🆕 Добавлено:
- `src/server.js` - Express приложение
- `src/config/database.js` - MongoDB подключение
- `src/middleware/auth.js` - JWT авторизация
- `src/middleware/validation.js` - валидация входных данных
- `package.json` - NPM зависимости
- `.env.example` - переменные окружения
- `Dockerfile` - контейнеризация
- `docker-compose.yml` - запуск с MongoDB
- `.github/workflows/deploy.yml` - CI/CD

## 🚀 Как запустить

### Локально (без Docker)

```bash
# 1. Установить Node.js 16+
# https://nodejs.org/

# 2. Установить MongoDB
# Или использовать облачный сервис (MongoDB Atlas)

# 3. Клонировать проект
cd bisai

# 4. Установить зависимости
npm install

# 5. Настроить .env
cp .env.example .env
# Отредактировать .env с вашими параметрами

# 6. Запустить
npm start
# Откроется http://localhost:3000
```

### С Docker (проще)

```bash
# Убедитесь, что установлен Docker и Docker Compose

docker-compose up
# Приложение будет на http://localhost:3000
# MongoDB автоматически запустится на порту 27017
```

### Режим разработки

```bash
npm run dev
# С перезагрузкой на изменение файлов (nodemon)
```

## 📊 Тестирование API

### 1. Регистрация

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Ответ:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "_id": "...",
    "username": "john",
    "email": "john@example.com"
  }
}
```

### 2. Создание теста

```bash
curl -X POST http://localhost:3000/api/tests \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "title": "Математика",
    "description": "Базовые операции",
    "subject": "Math",
    "difficulty": "easy"
  }'
```

### 3. Добавление вопроса

```bash
curl -X POST http://localhost:3000/api/tests/TEST_ID/questions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "text": "2 + 2 = ?",
    "answers": [
      {"text": "4", "isCorrect": true},
      {"text": "5", "isCorrect": false},
      {"text": "3", "isCorrect": false}
    ]
  }'
```

### 4. Опубликовать тест

```bash
curl -X POST http://localhost:3000/api/tests/TEST_ID/publish \
  -H "Authorization: Bearer TOKEN"
```

### 5. Получить список тестов

```bash
curl http://localhost:3000/api/tests/list
```

### 6. Создать игровую сессию

```bash
curl -X POST http://localhost:3000/api/games/session \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "testId": "TEST_ID",
    "teamRedName": "Красные",
    "teamBlueName": "Синие"
  }'
```

**Ответ содержит `code` (например: `ABC123XY`)** - этот код используется в игре.

## 📁 Структура папок

```
bisai/
├── src/
│   ├── config/
│   │   ├── env.js           # Конфигурация из .env
│   │   └── database.js      # Подключение MongoDB
│   ├── models/
│   │   ├── User.js          # Схема пользователя
│   │   ├── Test.js          # Схема теста
│   │   └── GameSession.js   # Схема игровой сессии
│   ├── controllers/
│   │   ├── authController.js    # Авторизация
│   │   ├── testController.js    # Управление тестами
│   │   └── gameController.js    # Управление играми
│   ├── routes/
│   │   ├── auth.js          # Маршруты авторизации
│   │   ├── tests.js         # Маршруты тестов
│   │   └── game.js          # Маршруты игр
│   ├── middleware/
│   │   ├── auth.js          # JWT токены
│   │   └── validation.js    # Валидация
│   └── server.js            # Главное приложение Express
│
├── public/
│   ├── index.html           # Главная HTML страница
│   └── assets/
│       ├── css/
│       │   └── main.css     # Основные стили
│       └── js/
│           ├── main-new.js  # Главная логика приложения
│           └── tug-of-war.js # Анимация каната
│
├── package.json             # Зависимости Node.js
├── .env.example            # Пример конфигурации
├── Dockerfile              # Для Docker
├── docker-compose.yml      # Docker Compose с MongoDB
├── .gitignore              # Игнорировать в Git
└── README_NODE.md          # Полная документация
```

## 🔧 Переменные окружения (.env)

```bash
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/bisai
JWT_SECRET=your-super-secret-key-change-this
SESSION_SECRET=your-session-secret
CORS_ORIGIN=http://localhost:3000
```

## 🐛 Частые ошибки

### "MongoDB connection failed"
```
✓ Убедитесь, что MongoDB запущена
✓ Проверьте DATABASE_URL в .env
✓ Используйте MongoDB Atlas (облако): mongodb+srv://user:pass@cluster.mongodb.net/bisai
```

### "Port 3000 already in use"
```bash
PORT=3001 npm start
```

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📱 Тестирование в браузере

1. Откройте http://localhost:3000
2. Нажмите "Register" 
3. Создайте аккаунт (username: test, email: test@example.com, password: password123)
4. Нажмите "Create Test"
5. Добавьте вопросы с ответами
6. Опубликуйте тест ("Publish Test")
7. Вернитесь на главную
8. Нажмите "Play Now" на тесте
9. Выберите имена команд
10. Ответьте на вопросы
11. Смотрите результаты!

## 🚀 Развертывание

### Heroku

```bash
heroku login
heroku create bisai-app
heroku addons:create mongolab:sandbox
git push heroku main
```

### Railway

```bash
railway login
railway link
railway up
```

### DigitalOcean App Platform

1. Нажмите "Create" → "App"
2. Выберите GitHub репозиторий
3. Установите переменные окружения
4. Deploy!

### AWS Lambda (Serverless)

```bash
npm install -g serverless
serverless deploy
```

## 📚 Полезные ссылки

- 🔗 [Express.js документация](https://expressjs.com/)
- 🔗 [Mongoose (MongoDB для Node)](https://mongoosejs.com/)
- 🔗 [JWT (JSON Web Tokens)](https://jwt.io/)
- 🔗 [Docker документация](https://docs.docker.com/)
- 🔗 [Heroku документация](https://devcenter.heroku.com/)

## ✅ Что дальше?

- [ ] Добавить WebSocket для real-time обновлений
- [ ] Создать мобильное приложение (React Native)
- [ ] Добавить поддержку видеовопросов
- [ ] Реализовать систему рейтинга
- [ ] Интеграция с LMS (Moodle, Canvas)

## 🎉 Готово!

Проект полностью готов к использованию и развертыванию на сервере!

**Примечание:** Все старые PHP файлы можно удалить. Новая версия на Node.js полностью их заменяет.
