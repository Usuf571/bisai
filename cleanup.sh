#!/bin/bash
# Скрипт для удаления старых PHP файлов

echo "⚠️  Удаление старых PHP файлов..."

# Удалить старые PHP файлы
rm -rf config/
rm -rf controllers/
rm -rf models/
rm -rf includes/
rm -f public/*.php
rm -f public/router.php

# Удалить базу данных/миграции
rm -rf database/

# Удалить старую документацию
rm -f README.md
rm -f INSTALL.md
rm -f ARCHITECTURE.md
rm -f PROJECT_STRUCTURE.md
rm -f COMPLETE_SCHEMA.md
rm -f CHEATSHEET.md

# Удалить старый main.js если нужно
# rm -f public/assets/js/game.js
# rm -f public/assets/js/main.js

echo "✅ Старые PHP файлы удалены!"
echo "📝 Используйте: README_NODE.md и NODE_SETUP.md"
echo "🚀 Запустите: npm install && npm start"
