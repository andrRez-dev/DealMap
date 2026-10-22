#!/bin/sh
set -e

# 1. Создаем .env, если его нет
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# 2. Устанавливаем зависимости Composer (если папки vendor нет или она пустая)
if [ ! -d "vendor" ] || [ -z "$(ls -A vendor)" ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# 3. Генерируем ключ приложения, если он отсутствует в .env
if ! grep -q "^APP_KEY=base64:" .env; then
    echo "Generating Application Key..."
    php artisan key:generate --force
fi

# 4. Исправляем права на storage и cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 5. Запускаем миграции
echo "Running database migrations..."
php artisan migrate --force

# 6. Передаем управление основной команде (php-fpm)
exec "$@"