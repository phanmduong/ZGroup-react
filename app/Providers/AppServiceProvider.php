<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */

    public static $config;

    public function boot()
    {
        if (!\App::environment('local')) {
            \URL::forceSchema('http');
        }
        if (env('APP_ENV', 'local') !== 'local') {
            \DB::connection()->disableQueryLog();
        }

        //get config such as email, name, ... from file json
        AppServiceProvider::$config = json_decode(file_get_contents(__DIR__.'/../../config.json'), true);
        view()->share(['EMAIL_CONFIG'=>AppServiceProvider::$config['email']]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(){
        if ($this->app->environment() == 'local') {
            $this->app->register('Laracasts\Generators\GeneratorsServiceProvider');
        }
    }
}
