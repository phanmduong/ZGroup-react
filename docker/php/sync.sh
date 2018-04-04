export COMPOSER_HOME=/var/www/client/vendor/bin/composer
export HOME=/var/www/client;
cd /var/www/client;
git stash -u;
git pull "https://keetool:Hungkhi550623@github.com/phanmduong/keetool-client-server" test;
php artisan migrate;
php composer.phar dump-autoload
php artisan clear-compiled;
php artisan config:cache;
php artisan optimize --force;
php artisan db:seed;
# pm2 stop socket;
# npm install;
# pm2 start /var/www/client/socket-http.js --name="socket";