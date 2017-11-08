<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 08/11/2017
 * Time: 15:18
 */

namespace Modules\SocialApi\Http\Controllers;


use App\Http\Controllers\NoAuthApiController;
use Illuminate\Http\Request;


class ReportController extends NoAuthApiController
{
    public function __construct()
    {
    }
    public function reportByEmail(Request $request){
        if($request->name==null || trim($request->name) =="")
            return $this->respondErrorWithStatus("Thiếu tên");
        if($request->message==null || trim($request->message)=="")
            return $this->respondErrorWithStatus("Thiếu lời nhắn");
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return $this->respondErrorWithStatus("Email không hợp lệ");
        }
        return $this->respondSuccessWithStatus([
           "message" => "Phản hồi thành công"
        ]);


    }
}