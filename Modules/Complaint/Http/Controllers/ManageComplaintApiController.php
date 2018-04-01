<?php

namespace Modules\Complaint\Http\Controllers;

use App\Complaint;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ManageComplaintApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createComplaint(Request $request){
        $validator = Validator::make($request->all(), [
            'content' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->respondErrorWithStatus("Chưa nhập nội dung.");
        }

        $complaint = new Complaint;
        $complaint->user_id = $request->user_id;
        $complaint->content = $request->content;
        $complaint->image_urls = $request->image_urls;
        $complaint->save();

        return $this->respondSuccess("Gửi thành công");
    }

}
