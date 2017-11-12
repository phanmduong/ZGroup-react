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
use Illuminate\Support\Facades\Mail;


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
        if($request->title==null || trim($request->title)=="")
            return $this->respondErrorWithStatus("Thiếu tiêu đề");
        if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
            return $this->respondErrorWithStatus("Email không hợp lệ");
        }
        $data=[
          "name" => $request->name,
          "message_str" => $request->message,
          "title"=>$request->title,
          "email" => $request->email
        ];
        //dd($data['email']);
        Mail::send('socialapi::reportEmail', $data, function ($m) use ($data) {
            $m->from('no-reply@colorme.vn', 'Kee Tool');
            $subject= "Báo cáo lỗi app";
            $m->to($data['email'], $data['name'])->bcc("keetool.feedback@gmail.com")->subject($subject);
        });
        return $this->respondSuccessWithStatus([
           "message" => "Phản hồi thành công"
        ]);


    }
}