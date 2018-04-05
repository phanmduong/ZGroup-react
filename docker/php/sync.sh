#!/bin/bash

export COMPOSER_HOME=/var/www/vendor/bin/composer;
export HOME=/var/www;
cd /var/www;
git pull origin master;
php artisan migrate;
php composer.phar dump-autoload
php artisan clear-compiled;
php artisan config:cache;
php artisan optimize --force;
php artisan db:seed;
