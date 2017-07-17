<?php

namespace App\Http\Controllers;

use App\Providers\AppServiceProvider;
use App\StudyClass;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageClassApiController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function activate_class(Request $request)
    {
        $class_id = $request->class_id;
        $class = StudyClass::find($class_id);
        foreach ($class->registers as $regis) {
            send_mail_activate_class($regis, [AppServiceProvider::$config['email']]);
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
