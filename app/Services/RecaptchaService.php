<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 1/9/18
 * Time: 4:39 PM
 */

namespace App\Services;


class RecaptchaService
{
    public function __construct()
    {
    }

    public function verify($captcha){
        $client = new \GuzzleHttp\Client();

        $r = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
            'form_params' => [
                'response' => $captcha,
                'secret' => config("app.google_recaptcha_secret")
            ]
        ]);
        $body = json_decode($r->getBody()->getContents());

        return $body->success;
    }

}