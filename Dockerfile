FROM node:18-alpine

WORKDIR /app

# Копировать package.json
COPY package*.json ./

# Установить зависимости
RUN npm ci --only=production

# Копировать исходный код
COPY src ./src
COPY public ./public
COPY .env.example .env

# Открыть порт
EXPOSE 3000

# Запустить приложение
CMD ["npm", "start"]
