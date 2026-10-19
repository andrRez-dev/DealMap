FROM node:20-alpine

WORKDIR /app

# Копируем файлы манифестов пакетов
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы frontend
COPY . .

# Открываем порт Vite
EXPOSE 5173

# Запускаем в режиме разработки с флагом --host, чтобы сервер пробрасывался наружу контейнера
CMD ["npm", "run", "dev", "--", "--host"]