FROM python:3.11-slim

WORKDIR /app

# Отключаем создание pyc файлов и включение буферизации вывода
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Копируем зависимости
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Копируем исходный код backend
COPY . .

# Открываем порт FastAPI
EXPOSE 8000

# Запускаем uvicorn (предполагается, что экземпляр FastAPI в main.py с именем app)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]