FROM php:7.0.27-fpm
COPY ./php.ini /usr/local/etc/php/php.ini

RUN apt-get update && apt-get install -y libmcrypt-dev \
    mysql-client libmagickwand-dev --no-install-recommends \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && docker-php-ext-install mcrypt pdo_mysql 
RUN apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng12-dev \
    && docker-php-ext-install -j$(nproc) iconv mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN chown -R www-data:www-data /var/www

# RUN sed -i 's/:9000/:9001/' /usr/local/etc/php-fpm.d/zz-docker.conf

# RUN apt-get install cron -y
# RUN apt-get install nano -y
# RUN apt-get install supervisor -y

# RUN touch /var/log/cron.log
# COPY ./crontab /etc/cron.d/schedule-cron
# RUN chmod 0644 /etc/cron.d/schedule-cron
# RUN crontab /etc/cron.d/schedule-cron 

# RUN touch /var/log/supervisord.log

# COPY ./supervisor.conf /etc/supervisor/conf.d/supervisor.conf
# RUN supervisord -c /etc/supervisor/conf.d/supervisor.conf

# CMD cron -f && tail -f /var/log/cron.log