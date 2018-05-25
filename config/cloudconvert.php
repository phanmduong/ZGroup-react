<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| CloudConvert Config
	|--------------------------------------------------------------------------
	|
	| CloudConvert is a file conversion service. Convert anything to anything
	| more than 100 different audio, video, document, ebook, archive, image,
	| spreadsheet and presentation formats supported.
	|
	*/

	/**
	 * API Key
	 * You can get it from: https://cloudconvert.org/user/profile
	 */

	'api_key' => 'RFAaR84Cmy8NgCvpdbfV4CSvsGGAdyzbSyxtjSciKMyFjYRqmP0K68jesWPIezOaMYlg3sfp81XHi9tyc-nb0w',
	's3' => [
		'accesskeyid' => env('S3_KEY'),
		'secretaccesskey' => env('S3_SECRET'),
		'bucket' => env('S3_BUCKET'),
		'acl' => 'public-read',
		'region' => env('S3_REGION')
	],
	'ftp' => [
		'host' => '',
		'user' => '',
		'password' => '',
		'port' => 21,
		'dir' => '',
	]

);