<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 7/20/17
 * Time: 17:25
 */

namespace App\Http\Controllers;


use App\Providers\AppServiceProvider;
use App\StudyClass;
use App\Role;
use App\Tab;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageUploadApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function upload_image_editor( Request $request)
    {
        $image_name = uploadFileToS3($request, 'image', 800, null);
        if ($image_name != null) {
            $data["image_url"] = config('app.protocol').trim_url($this->s3_url . $image_name);
            $data["image_name"] = $image_name;
        }
        return $this->respond(['link' => $data['image_url']]);
    }
}