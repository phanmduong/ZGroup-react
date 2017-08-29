<?php

namespace Modules\Task\Http\Controllers;

use App\File;
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

        if ($file_name != null) {
            $clientFile = $request->file('file');

            $file = new File();
            $file->url = $this->s3_url . $file_name;
            $file->name = $clientFile->getClientOriginalName();
            $file->size = $clientFile->getSize();
            $file->card_id = $cardId;
            $file->file_key = $file_name;
            $file->ext = $clientFile->getClientOriginalExtension();
            $file->type = $clientFile->getMimeType();
            $file->save();

            $file->url = generate_protocol_url($file->url);
            $file->index = $request->index;

            return $this->respond($file);
        } else {
            return $this->respondErrorWithStatus("Tải ảnh lên không thành công");

        }


    }

}
