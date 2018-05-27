<?php

namespace Modules\File\Http\Controllers;

use App\File;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class FileController extends ManageApiController
{
    public function uploadFile(Request $request)
    {
        $file_name = uploadLargeFileToS3($request, 'file');

        if ($file_name != null) {
            $clientFile = $request->file('file');

            $file = new File();
            $file->url = $this->s3_url . $file_name;
            $file->name = $clientFile->getClientOriginalName();
            $file->size = $clientFile->getSize();
            $file->file_key = $file_name;
            $file->card_id = 0;
            $file->ext = $clientFile->getClientOriginalExtension();
            $file->type = $clientFile->getMimeType();
            $file->save();

            $file->url = generate_protocol_url($file->url);
            $file->index = $request->index;

            return $this->respond($file);
        } else {
            return $this->respondErrorWithStatus("Tải tệp lên không thành công");
        }
    }

    public function addUrl(Request $request)
    {
        $url = $request->url;
        if (is_null($url)) {
            return $this->respondErrorWithStatus("Bạn cần truyền lên url");
        }

        $file = new File();
        $file->url = $url;
        $file->name = $url;
        $file->size = 0;
        $file->card_id = 0;
        $file->file_key = $url;
        $file->ext = "url";
        $file->type = "url";
        $file->save();

        return $this->respond($file);
    }

    public function uploadImage(Request $request)
    {
        $file_name = uploadLargeFileToS3($request, 'file');

        if ($file_name != null) {
            return $this->respond(["url" => generate_protocol_url($this->s3_url . $file_name)]);
        } else {
            return $this->respondErrorWithStatus("Tải tệp lên không thành công");
        }
    }
    public  function  uploadProof(Request $request){
        $file_name = uploadFileToS3($request, 'image', 800, null);

        if ($file_name != null) {
            return  generate_protocol_url($this->s3_url . $file_name);
        } else {
            return $this->respondErrorWithStatus("Tải tệp lên không thành công");
        }
    }

}
