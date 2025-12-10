@echo off
REM Удаление старых PHP файлов (Windows версия)

echo Удаление старых PHP файлов...
echo.

REM Удалить папки
rmdir /s /q "config" 2>nul
rmdir /s /q "controllers" 2>nul
rmdir /s /q "models" 2>nul
rmdir /s /q "includes" 2>nul
rmdir /s /q "database" 2>nul

REM Удалить PHP файлы из public
del /q "public\*.php" 2>nul
del /q "public\router.php" 2>nul

REM Удалить старую документацию
del /q "README.md" 2>nul
del /q "INSTALL.md" 2>nul
del /q "ARCHITECTURE.md" 2>nul
del /q "PROJECT_STRUCTURE.md" 2>nul
del /q "COMPLETE_SCHEMA.md" 2>nul
del /q "CHEATSHEET.md" 2>nul

echo.
echo ✅ Старые PHP файлы удалены!
echo.
echo 📝 Используйте: README_NODE.md и NODE_SETUP.md
echo 🚀 Запустите: npm install ^&^& npm start
echo.
pause
