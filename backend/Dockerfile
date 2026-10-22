# Используем официальный образ PHP 8.4 с FPM на базе Alpine
FROM php:8.4-fpm-alpine

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Устанавливаем системные зависимости и расширения PHP, необходимые для Laravel
RUN apk add --no-cache \
    build-base \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    oniguruma-dev \
    postgresql-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring zip exif pcntl gd bcmath

# Устанавливаем Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копируем существующие файлы проекта
COPY . /var/www/html

# Копируем и настраиваем entrypoint скрипт
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Настраиваем права доступа для директорий storage и bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Открываем порт 9000 для PHP-FPM
EXPOSE 9000

# Точка входа для первичной инициализации
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["php-fpm"]