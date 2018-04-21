<?php

namespace App\Http\Controllers;

use Aws\Ses\SesClient;
use Illuminate\Http\Request;

use App\Http\Requests;

class SendMailController
{
    private $sesClient;

    public function __construct()
    {
        $this->sesClient = SesClient::factory(array(
            'credentials' => [
                'key' => config('app.s3_key'),
                'secret' => config('app.s3_secret')
            ],
            'region' => 'us-west-2',
            'version' => 'latest'

        ));
    }

    public function sendAllEmail($email, $subject, $body, $type = null)
    {
        $source = config('app.email_company_name') . ' ' . '<' . config('app.email_company_from') . '>';
        $message = array(
            // 'Source' => 'Color ME <no-reply@colorme.vn>',
            'Source' => $source,          
            'Destination' => array(
                'ToAddresses' => $email,
//                'BccAddresses' => $ccList,
            ),
            'Message' => array(
                'Subject' => array(
                    'Data' => $subject,
                    'Charset' => 'utf-8',
                ),
                'Body' => array(
                    'Text' => array(
                        'Data' => 'Color Me',
                        'Charset' => 'utf-8',
                    ),
                    'Html' => array(
                        'Data' => $body,
                        'Charset' => 'utf-8',
                    ),
                ),
            ),
        );
        $result = $this->sesClient->sendEmail($message);
        return $result;
    }
}
