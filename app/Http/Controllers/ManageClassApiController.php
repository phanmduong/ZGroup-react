<?php

namespace App\Http\Controllers;

use App\Services\EmailService;
use App\StudyClass;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageClassApiController extends ManageApiController
{
    protected $emailService;

    public function __construct(
        EmailService $emailService
    )
    {
        parent::__construct();
    }

    public function activate_class(Request $request)
    {
        $class_id = $request->class_id;
        $class = StudyClass::find($class_id);
        foreach ($class->registers as $regis) {
            $this->emailService->send_mail_activate_class($regis, ['colorme.vn.test@gmail.com']);
        }
        $class->activated = 1;
        $class->status = 0;
        $class->save();
        return $this->respondSuccessWithStatus(['message' => "Kích hoạt thành công"]);
    }

    public function change_class_status(Request $request)
    {
        $class_id = $request->class_id;
        if ($class_id != null) {
            $class = StudyClass::find($class_id);
            $class->status = ($class->status == 1) ? 0 : 1;
            $class->save();
        }
        return $this->respondSuccessWithStatus(['message' => "Kích hoạt thành công"]);
    }
}
