<?php

namespace Modules\Task\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class FileController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function uploadFile($cardId, Request $request)
    {
        $file_name = uploadLargeFileToS3($request, 'file');
//        if ($file_name != null) {
//            $this->user->avatar_name = $avatar_name;
//            $this->user->avatar_url = $this->s3_url . $avatar_name;
//        }
        return $this->respond([
            "message" => "Tải lên thành công",
            "url" => $file_name
        ]);
    }

}
