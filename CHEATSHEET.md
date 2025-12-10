# ⚡ BiSAI - КРАТКАЯ ШПАРГАЛКА

## 🎯 За 5 минут

### Установка
```bash
# 1. Импортировать БД (phpMyAdmin)
mysql -u root < database/migrations/001_create_initial_tables.sql

# 2. Отредактировать config/db.php
host = localhost
database = bisai_db
username = root
password = 

# 3. Запустить
php -S localhost:8000 -t public/

# 4. Открыть
http://localhost:8000
```

---

## 📊 Структура в двух словах

```
Пользователь → Веб-сайт (HTML/JS/CSS)
                    ↓
              API Контроллеры (PHP)
                    ↓
              Модели (ORM)
                    ↓
              База данных (MySQL)
```

---

## 📝 Основные файлы

| Файл | Назначение |
|------|-----------|
| `/public/index.php` | Главная страница |
| `/public/api.php` | API для AJAX |
| `/controllers/*` | Бизнес-логика |
| `/models/*` | Работа с БД |
| `/includes/Database.php` | Подключение к БД |
| `/config/db.php` | Параметры БД |

---

## 🔌 Основные API endpoints

### Авторизация
```
POST /api.php?action=login
POST /api.php?action=register
GET  /logout.php
```

### Тесты
```
POST /api.php?action=create_test
POST /api.php?action=add_question
POST /api.php?action=publish_test
```

### Игра
```
POST /api.php?action=create_game_session
POST /api.php?action=add_player
POST /api.php?action=start_game
POST /api.php?action=get_current_question
POST /api.php?action=submit_answer
POST /api.php?action=get_results
```

---

## 🎮 Быстрый старт игры

```javascript
// 1. Создать сессию
fetch('/api.php?action=create_game_session', {
    method: 'POST',
    body: new URLSearchParams({
        test_id: 1,
        team_red_name: 'Красные',
        team_blue_name: 'Синие'
    })
})

// 2. Добавить игрока
fetch('/api.php?action=add_player', {
    method: 'POST',
    body: new URLSearchParams({
        session_code: 'ABC123',
        player_name: 'Иван',
        team_color: 'red'
    })
})

// 3. Начать игру
fetch('/api.php?action=start_game', {
    method: 'POST',
    body: new URLSearchParams({
        session_code: 'ABC123'
    })
})

// 4. Получить вопрос
fetch('/api.php?action=get_current_question', {
    method: 'POST',
    body: new URLSearchParams({
        session_code: 'ABC123'
    })
})

// 5. Отправить ответ
fetch('/api.php?action=submit_answer', {
    method: 'POST',
    body: new URLSearchParams({
        session_code: 'ABC123',
        player_id: 1,
        answer_id: 5
    })
})
```

---

## 💾 Основные SQL команды

```sql
-- Создать БД
CREATE DATABASE bisai_db CHARACTER SET utf8mb4;

-- Импортировать схему
mysql -u root bisai_db < database/migrations/001_create_initial_tables.sql

-- Посмотреть таблицы
SHOW TABLES IN bisai_db;

-- Посмотреть структуру таблицы
DESCRIBE bisai_users;

-- Посмотреть данные
SELECT * FROM bisai_users;
SELECT * FROM bisai_tests;
SELECT * FROM bisai_game_sessions;

-- Удалить все данные (осторожно!)
TRUNCATE TABLE bisai_users;
```

---

## 🔐 Примеры кода

### Создать пользователя
```php
$user = User::register([
    'username' => 'john_doe',
    'email' => 'john@example.com',
    'password' => 'password123',
    'first_name' => 'John',
    'last_name' => 'Doe',
]);
```

### Найти пользователя
```php
$user = User::findByUsername('john_doe');
$user = User::findByEmail('john@example.com');
$user = User::find(1);
```

### Проверить пароль
```php
if ($user->verifyPassword('password123')) {
    echo "Пароль верный!";
}
```

### Создать тест
```php
$test = new Test();
$test->title = 'Математика';
$test->description = 'Основные операции';
$test->creator_id = 1;
$test->save();
```

### Добавить вопрос
```php
$question = new Question();
$question->test_id = $test->id;
$question->question_text = 'Сколько будет 2+2?';
$question->order = 1;
$question->save();

// Добавить ответы
$question->addAnswer(['answer_text' => '4', 'is_correct' => true, 'order' => 1]);
$question->addAnswer(['answer_text' => '5', 'is_correct' => false, 'order' => 2]);
```

### Создать игру
```php
$session = GameSession::createNew(1, 'Red Team', 'Blue Team');
$session->addPlayer('Марк', 'red', 1);
$session->addPlayer('Маша', 'blue', 2);
$session->start();
```

---

## 🎨 CSS классы

```html
<!-- Кнопки -->
<button class="btn-primary">Отправить</button>
<button class="btn-secondary">Отмена</button>
<button class="btn-danger">Удалить</button>

<!-- Оповещения -->
<div class="alert alert-success">Успешно!</div>
<div class="alert alert-error">Ошибка!</div>
<div class="alert alert-warning">Внимание!</div>

<!-- Сетка -->
<div class="grid grid-2">
    <div>Колонка 1</div>
    <div>Колонка 2</div>
</div>

<!-- Flex -->
<div class="flex flex-between">
    <div>Слева</div>
    <div>Справа</div>
</div>

<!-- Отступы -->
<div class="mt-3 mb-4 p-2">Контент</div>

<!-- Цвета текста -->
<span class="text-primary">Синий текст</span>
<span class="text-danger">Красный текст</span>
<span class="text-success">Зеленый текст</span>
```

---

## 🎯 Общие функции PHP

```php
// Авторизация
getAuthUser()                     // Получить текущего пользователя
requireAuth()                     // Требовать авторизацию
isAuthenticated()                 // Проверить авторизацию
canEditTest($testId)              // Проверить право на редактирование

// Безопасность
escape($string)                   // Экранировать для HTML
hashPassword($password)           // Хешировать пароль
verifyPassword($plain, $hash)    // Проверить пароль

// Утилиты
redirect($url)                    // Перенаправить
jsonResponse($data)               // Отправить JSON
timeAgo($timestamp)               // "2 часа назад"
formatDate($timestamp)            // Форматировать дату

// Логирование
log_action($userId, $action, ...) // Записать событие
```

---

## 🐛 Типичные ошибки

| Ошибка | Решение |
|--------|---------|
| "Access denied for user 'root'" | Проверьте пароль в config/db.php |
| "Class not found" | Убедитесь, что файл модели в /models/ |
| "Table not found" | Импортируйте SQL схему |
| "Undefined variable" | Проверьте передачу переменной из контроллера |
| "Headers already sent" | Не выводите ничего до header() |

---

## 📱 Мобильная проверка

```bash
# Запустить с доступом с мобильного
php -S 0.0.0.0:8000 -t public/

# Открыть на телефоне
http://[IP_компьютера]:8000
```

---

## 🔧 Отладка

```php
// Включить вывод ошибок
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Логировать переменную
var_dump($variable);
echo json_encode($data, JSON_PRETTY_PRINT);

// Проверить запрос
echo 'POST: ' . print_r($_POST, true);
echo 'GET: ' . print_r($_GET, true);
echo 'SESSION: ' . print_r($_SESSION, true);
```

---

## 🚀 Развертывание на хостинг

1. **FTP/SFTP** - загрузить все файлы
2. **phpMyAdmin** - импортировать БД
3. **config/db.php** - обновить параметры хостинга
4. **chmod 755** - дать права на папки
5. **chmod 644** - дать права на файлы
6. **Открыть** - перейти на доменное имя

---

## 📖 Документация

- 📄 README.md - основная информация
- 📘 INSTALL.md - инструкция по установке
- 📗 PROJECT_STRUCTURE.md - структура проекта
- 📙 ARCHITECTURE.md - техническая архитектура
- 📕 COMPLETE_SCHEMA.md - полная схема

---

## 💡 Полезные команды

```bash
# Проверить синтаксис PHP
php -l public/index.php

# Запустить PHP встроенный сервер
php -S localhost:8000 -t public/

# Посмотреть информацию о PHP
php -i

# Подключиться к MySQL
mysql -u root -p

# Дамп БД
mysqldump -u root bisai_db > backup.sql

# Восстановить из дампа
mysql -u root bisai_db < backup.sql
```

---

## 🎓 Ресурсы для обучения

- **PHP** - www.php.net
- **MySQL** - dev.mysql.com
- **MDN JavaScript** - developer.mozilla.org
- **W3CSS** - w3schools.com

---

**Все готово! Начните разработку прямо сейчас! 🚀**

*Для вопросов смотрите полную документацию в README.md*
