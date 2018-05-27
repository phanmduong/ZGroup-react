<?php
// Turn off all error reporting
error_reporting(0);
/**
 * Transfer (Export) Files Server to Server using PHP FTP
 * FTP remote export
 * http://pixfort.com
 */
/* Remote File Name and Path */
$dir = $_POST['pix_ftp_dir'];

$ftp_host = $_POST['pix_ftp_host']; /* host */
$ftp_user_name = $_POST['pix_ftp_username']; /* username */
$ftp_user_pass = $_POST['pix_ftp_password']; /* password */

$page = $_POST['export_markup'];
$imgs = json_decode($_POST['pix_export_imgs_Field']);
 
/* File and path to send to remote FTP server */
$local_file = 'hello.txt';

$external_css_files = true;

$form_type_export = $_POST['form_type_export'];
$imgs = json_decode($_POST['pix_export_imgs_Field']);
$imgs[] = "images/favicon.ico";
$recaptcha = $_POST['recaptcha'];

$to_Email = $_POST['to_Email'];
$subject = $_POST['subject'];

$MC_APIKEY = $_POST['MC_APIKEY'];
$MC_LISTID = $_POST['MC_LISTID'];

$CM_APIKEY = $_POST['CM_APIKEY'];
$CM_LISTID = $_POST['CM_LISTID'];

$GR_APIKEY = $_POST['GR_APIKEY'];
$GR_CAMPAIGN = $_POST['GR_CAMPAIGN'];

$AW_AUTHCODE = $_POST['AW_AUTHCODE'];
$AW_LISTNAME = $_POST['AW_LISTNAME'];

$ACTIVECAMPAIGN_URL = $_POST['AC_ACTIVECAMPAIGN_URL'];
$ACTIVECAMPAIGN_API_KEY = $_POST['AC_ACTIVECAMPAIGN_API_KEY'];
$list_id = $_POST['AC_list_id'];


$MailerLite_API_KEY = $_POST['MailerLite_API_KEY'];
$MailerLite_LIST_ID = $_POST['MailerLite_LIST_ID'];

$FM_API_KEY = $_POST['FM_API_KEY'];
$FM_API_SECRET = $_POST['FM_API_SECRET'];
$FM_list_id = $_POST['FM_list_id'];

$Sendloop_API3_KEY = $_POST['Sendloop_API3_KEY'];
$Sendloop_SUBDOMAIN = $_POST['Sendloop_SUBDOMAIN'];

$pixfort_mail = "<?php
	\$mail_type = '$form_type_export';
	//-----------------------------------------------------------------------------------------
    \$to_Email       = '$to_Email'; //Replace with recipient email address
    \$subject        = '$subject'; //Subject line for emails

    // your recaptcha secret key
    \$secret = '$recaptcha';      // Add your reCAPTCHA secret key
    //-----------------------------------------------------------------------------------------

    // Language
    \$language = 'EN';

    /* Mailchimp setting */
    define('MC_APIKEY', '$MC_APIKEY'); // Your API key from here - http://admin.mailchimp.com/account/api
    define('MC_LISTID', '$MC_LISTID'); // List unique id from here - http://admin.mailchimp.com/lists/

    /* Campaign Monitor setting. */
    define('CM_APIKEY', '$CM_APIKEY'); // Your APIKEY from here - https://pixfort.createsend.com/admin/account/
    define('CM_LISTID', '$CM_LISTID'); // List ID from here - https://www.campaignmonitor.com/api/getting-started/#listid

    /* GetResponse setting. To enable a setting, uncomment (remove the '#' at the start of the line)*/
    define('GR_APIKEY', '$GR_APIKEY'); // Your API key from here - https://app.getresponse.com/my_api_key.html
    define('GR_CAMPAIGN', '$GR_CAMPAIGN'); // Campaign name from here - https://app.getresponse.com/campaign_list.html
    
    /* AWeber setting */
    define('AW_AUTHCODE', '$AW_AUTHCODE'); // Your Authcode from here - https://auth.aweber.com/1.0/oauth/authorize_app/647b2efd
    define('AW_LISTNAME', '$AW_LISTNAME'); // List name from here - https://www.aweber.com/users/autoresponder/manage

    /* ActiveCampaign setting */
    define('ACTIVECAMPAIGN_URL', '$ACTIVECAMPAIGN_URL'); // API_URL : Go to My Settings -> Developers
    define('ACTIVECAMPAIGN_API_KEY', '$ACTIVECAMPAIGN_API_KEY'); // API_KEY : Go to My Settings -> Developers
    define('list_id', '$list_id'); // API_KEY : Go to My Settings -> Developers

    /* MailerLite setting */
    define('MailerLite_API_KEY', '$MailerLite_API_KEY'); // API Key: Go to https://app.mailerlite.com/integrations/api/
    define('MailerLite_LIST_ID', '$MailerLite_LIST_ID'); // LIST ID (GroupID): Go to https://app.mailerlite.com/integrations/api/

    /* FreshMail setting */
    define ( 'FM_API_KEY', '$FM_API_KEY' ); // API Key: Go to https://app.freshmail.com/en/settings/integration/
    define ( 'FM_API_SECRET', '$FM_API_SECRET' ); // API Secret: Go to https://app.freshmail.com/en/settings/integration/
    define ( 'FM_list_id', '$FM_list_id' ); // List's API key: Go to list -> Parameters

    /* Sendloop setting */
    define('Sendloop_API3_KEY', '$Sendloop_API3_KEY');
    define('Sendloop_SUBDOMAIN', '$Sendloop_SUBDOMAIN');
?>";
 
/* Connect using basic FTP */
$connect_it = ftp_connect( $ftp_host );

if(!$connect_it){
	echo "Error: Couldn't connect to host: ".$ftp_host;
	die();
}
	/* Login to FTP */
	$login_result = ftp_login( $connect_it, $ftp_user_name, $ftp_user_pass );

if(!$login_result){
	echo "Error: Couldn't connect to the FTP server as: ". $ftp_user_name;
	die();
}else{
	$sub_dirs = array("assets/", "assets/css/", "assets/js/", "pix_mail/", "images/", "fonts/", "stylesheets/", "stylesheets/img/", "stylesheets/custom/", "js-files/", "pix_mail/api_activecampaign/", "pix_mail/api_aweber/", "pix_mail/api_campaign/", "pix_mail/api_freshmail/", "pix_mail/api_getresponse/", "pix_mail/api_mailchimp/", "pix_mail/api_mailerlite/", "pix_mail/api_sendloop/", "pix_mail/api_mailerlite/Base/", "pix_mail/phpmailer/");
	if (ftp_nlist($connect_it, $dir) == false) {
	    ftp_mkdir($connect_it, $dir);
	}
	foreach( $sub_dirs as $sub_item ){
		if (ftp_nlist($connect_it, $dir.$sub_item) == false) {
			//echo $sub_item;
		    ftp_mkdir($connect_it, $dir.$sub_item);
		}	
	}
	$file_list = ftp_nlist($connect_it, ".");
	foreach( $imgs as $img ){
		$local_file2 = 'elements/'.$img;
		$path_parts = pathinfo($img);
		$path_parts_arr = explode("/",$path_parts['dirname']);
		if(count($path_parts_arr)>1){
			if (ftp_nlist($connect_it, $dir.'images/'.$path_parts_arr[1]) == false) {
			    ftp_mkdir($connect_it, $dir.'images/'.$path_parts_arr[1]);
			}	
		}
		ftp_put($connect_it, $dir.$img, $local_file2, FTP_BINARY);
	}
	$pathToAssets = array("elements/js", "elements/stylesheets", "elements/pix_mail", "elements/fonts", "elements/js-files");
	foreach( $pathToAssets as $thePath ){
			// Create recursive directory iterator
			$files = new RecursiveIteratorIterator(
		    	new RecursiveDirectoryIterator( $thePath ),
		    	RecursiveIteratorIterator::LEAVES_ONLY
			);
			foreach ($files as $name => $file){
				if( $file->getFilename() != '.' && $file->getFilename() != '..' ) {
					// Get real path for current file
					$filePath = $file->getRealPath();
					$temp = explode("/", $name);
					array_shift( $temp );	    
					$newName = implode("/", $temp);
					$path_parts = pathinfo($newName);
					$newName = str_replace("\\","/",$newName);
					ftp_put($connect_it, $dir.$newName, 'elements/'.$newName, FTP_BINARY);
				}
			}
		}
		$skeleton1 = file_get_contents('elements/sk1.html');
		$skeleton2 = file_get_contents('elements/sk2.html');
		$skeleton3 = file_get_contents('elements/sk3.html');
		foreach( $_POST['pages'] as $page=>$content ){
			$t_seo = json_decode($_POST['seo'][$page]);
			$t_css = json_decode($_POST['css'][$page]);
			$seo_tags = '<title>'.$t_seo[0].'</title>'."\n".'<meta name="description" content="'.$t_seo[1].'">'."\n".'<meta name="keywords" content="'.$t_seo[2].'">'."\n".$t_seo[3];
			$customStyle = "\n</head>\n<body>";
			if(!empty($t_css)){
				if($external_css_files){
					$customStyle = "    <link rel=\"stylesheet\" href=\"stylesheets/custom/" . $page . ".css\">\n</head>\n<body>";
					$fp = fopen('php://temp', 'r+');
					fwrite($fp, $t_css);
					rewind($fp);       
					ftp_fput($connect_it, $dir."stylesheets/custom/".$page.".css", $fp, FTP_ASCII);
				}else{
					if(!empty($t_css)){
						$customStyle = "    <style type=\"text/css\" id=\"pix_style\">\n" . $t_css . "\n</style>\n</head>\n<body>";
					}
				}
			}
			$new_content = $skeleton1 . $seo_tags . $skeleton2 . $customStyle . stripslashes($content) . $skeleton3;
			$fp = fopen('php://temp', 'r+');
			fwrite($fp, stripslashes($new_content));
			rewind($fp);       
			ftp_fput($connect_it, $dir.$page.".html", $fp, FTP_ASCII);
		}
		$fp = fopen('php://temp', 'r+');
		fwrite($fp, stripslashes($pixfort_mail));
		rewind($fp);       
		ftp_fput($connect_it, $dir."pix_mail/config.php", $fp, FTP_ASCII);
	/* Close the connection */
	ftp_close( $connect_it );
	echo "Your website is successfully published!";
}
?>