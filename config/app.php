<?php

return [
    'edu_view' => env('EDU_VIEW', ''),
    'google_recaptcha_secret' => env('GOOGLE_RECAPTCHA_SECRET', ''),

    '' => env('FREE_TRIAL_SECRET', ''),

    'nganluong_merchant_id' => env('NGANLUONG_MERCHANT_ID', ''),
    'nganluong_merchant_pass' => env('NGANLUONG_MERCHANT_PASS', ''),
    'nganluong_receiver' => env('NGANLUONG_RECEIVER', ''),
    'nganluong_url_api' => env('NGANLUONG_URL_API', ''),

    'ghtk_api' => env('GHTK_API', ''),
    'facebook_app_id' => env('FACEBOOK_APP_ID', ''),
    'facebook_app_secret' => env('FACEBOOK_APP_SECRET', ''),
    'google_client_id' => env('GOOGLE_CLIENT_ID', ''),
    'domain' => env('DOMAIN', ''),
    'channel' => env('CHANNEL', ''),
    'social_channel' => env('SOCIAL_CHANNEL', ''),
    'protocol' => env('PROTOCOL', ''),
    'keetool_secret' => env('SECRET', ''),
    'favicon' => env('FAVICON', ''),
    's3_url' => env('S3_URL', false),
    's3_key' => env('S3_KEY', false),
    's3_secret' => env('S3_SECRET', false),
    's3_region' => env('S3_REGION', false),
    'fb_app_id' => env('FB_APP_ID', ''),
    'fcm_key' => env('FCM_KEY', ''),
    'topcv_key' => env('TOP_CV_KEY', ''),
    'sms_key' => env('SMS_KEY', ''),
    'domain_social' => env('DOMAIN_SOCIAL', 'no_social'),
    'domain_commerce' => env('DOMAIN_COMMERCE', 'no_commerce'),
    'email_company_name' => env('EMAIL_COMPANY_NAME', ''),
    'email_company_from' => env('EMAIL_COMPANY_FROM', ''),
    'email_company_to' => env('EMAIL_COMPANY_TO', ''),
    'prefix_code' => env('PREFIX_CODE', ''),
    'prefix_code_wait' => env('PREFIX_CODE_WAIT', ''),
    'brand_sms' => env('BRAND_SMS', ''),
    'sound_cloud_client_id' => env('SOUND_COULD_CLIENT_ID', ''),
    'noti_app_manage_id' => env('NOTI_APP_MANAGE_ID', ''),
    'noti_app_id' => env('NOTI_APP_ID', ''),
    'noti_app_key' => env('NOTI_APP_KEY', ''),
    'noti_app_manage_key' => env('NOTI_APP_MANAGE_KEY', ''),
    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services your application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | your application so that it is used when running Artisan tasks.
    |
    */

    'url' => 'https://localhost',

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => 'Asia/Ho_Chi_Minh',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the Illuminate encrypter service and should be set
    | to a random, 32 character string, otherwise these encrypted strings
    | will not be safe. Please do this before deploying an application!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Logging Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure the log settings for your application. Out of
    | the box, Laravel uses the Monolog PHP logging library. This gives
    | you a variety of powerful log handlers / formatters to utilize.
    |
    | Available Settings: "single", "daily", "syslog", "errorlog"
    |
    */

    'log' => env('APP_LOG', 'daily'),

    'log_max_files' => 30,
    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => [
        /*
         * Laravel Framework Service Providers...
         */
        Maatwebsite\Excel\ExcelServiceProvider::class,
        RobbieP\CloudConvertLaravel\CloudConvertLaravelServiceProvider::class,
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
        Jenssegers\Agent\AgentServiceProvider::class,
        Tymon\JWTAuth\Providers\JWTAuthServiceProvider::class,
        Jaybizzle\LaravelCrawlerDetect\LaravelCrawlerDetectServiceProvider::class,
        Nwidart\Modules\LaravelModulesServiceProvider::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => [
        'Excel' => Maatwebsite\Excel\Facades\Excel::class,
        'App' => Illuminate\Support\Facades\App::class,
        'Artisan' => Illuminate\Support\Facades\Artisan::class,
        'Auth' => Illuminate\Support\Facades\Auth::class,
        'Blade' => Illuminate\Support\Facades\Blade::class,
        'Cache' => Illuminate\Support\Facades\Cache::class,
        'Config' => Illuminate\Support\Facades\Config::class,
        'Cookie' => Illuminate\Support\Facades\Cookie::class,
        'Crypt' => Illuminate\Support\Facades\Crypt::class,
        'DB' => Illuminate\Support\Facades\DB::class,
        'Eloquent' => Illuminate\Database\Eloquent\Model::class,
        'Event' => Illuminate\Support\Facades\Event::class,
        'File' => Illuminate\Support\Facades\File::class,
        'Gate' => Illuminate\Support\Facades\Gate::class,
        'Hash' => Illuminate\Support\Facades\Hash::class,
        'Lang' => Illuminate\Support\Facades\Lang::class,
        'Log' => Illuminate\Support\Facades\Log::class,
        'Mail' => Illuminate\Support\Facades\Mail::class,
        'Password' => Illuminate\Support\Facades\Password::class,
        'Queue' => Illuminate\Support\Facades\Queue::class,
        'Redirect' => Illuminate\Support\Facades\Redirect::class,
        'Redis' => Illuminate\Support\Facades\Redis::class,
        'Request' => Illuminate\Support\Facades\Request::class,
        'Response' => Illuminate\Support\Facades\Response::class,
        'Route' => Illuminate\Support\Facades\Route::class,
        'Schema' => Illuminate\Support\Facades\Schema::class,
        'Session' => Illuminate\Support\Facades\Session::class,
        'Storage' => Illuminate\Support\Facades\Storage::class,
        'URL' => Illuminate\Support\Facades\URL::class,
        'Validator' => Illuminate\Support\Facades\Validator::class,
        'View' => Illuminate\Support\Facades\View::class,
        'Agent' => Jenssegers\Agent\Facades\Agent::class,
        'JWTAuth' => Tymon\JWTAuthFacades\JWTAuth::class,
        'JWTFactory' => Tymon\JWTAuthFacades\JWTFactory::class,
        'Module' => Nwidart\Modules\Facades\Module::class,
        'Crawler' => Jaybizzle\LaravelCrawlerDetect\Facades\LaravelCrawlerDetect::class
    ],
];
