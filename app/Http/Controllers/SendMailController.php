<?php

namespace App\Http\Controllers;

use Aws\Ses\SesClient;

class SendMailController
{
    private $sesClient;

    public function __construct()
    {
        $this->sesClient = SesClient::factory([
            'credentials' => [
                'key' => config('app.s3_key'),
                'secret' => config('app.s3_secret')
            ],
            'region' => 'us-west-2',
            'version' => 'latest'
        ]);
    }

    public function sendAllEmail($email, $subject, $body, $type = null)
    {
        $source = config('app.email_company_name') . ' ' . '<' . config('app.email_company_from') . '>';
        $message = [
            // 'Source' => 'Color ME <no-reply@colorme.vn>',
            'Source' => $source,
            'Destination' => [
                'ToAddresses' => $email,
//                'BccAddresses' => $ccList,
            ],
            'Message' => [
                'Subject' => [
                    'Data' => $subject,
                    'Charset' => 'utf-8',
                ],
                'Body' => [
                    'Text' => [
                        'Data' => 'Color Me',
                        'Charset' => 'utf-8',
                    ],
                    'Html' => [
                        'Data' => $body,
                        'Charset' => 'utf-8',
                    ],
                ],
            ],
        ];
        $result = $this->sesClient->sendEmail($message);
        return $result;
    }
}
