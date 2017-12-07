<?php

namespace App\Http\Controllers;

use App\Attendance;
use App\Gen;
use App\Group;
use App\GroupMember;
use App\Register;
use App\StudyClass;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use Illuminate\Support\Facades\Mail;

class ManageStudentController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 5;
    }

    public function confirm_change_class(Request $request)
    {
        $registerId = $request->registerId;
        $classId = $request->classId;

        $register = Register::find($registerId);
        if ($register->code) {
            $prefix = substr($register->code, 0, strlen(config('app.prefix_code_wait')));
            $code = Register::orderBy('code', 'desc')->first()->code;

            if ($prefix == config('app.prefix_code_wait') && count(explode(config('app.prefix_code_wait'), $code)) > 1) {
                $nextNumber = explode(config('app.prefix_code_wait'), $code)[1] + 1;
                $nextCode = config('app.prefix_code') . $nextNumber;
                $register->code = $nextCode;
                $register->save();
            }
        }


        $oldClass = $register->studyClass;
        $newClass = StudyClass::find($classId);


        if ($register->status == 1) {
            $class_lession_ids = $oldClass->classLessons->pluck('id');
            $attendances = $register->attendances()->whereIn('class_lesson_id', $class_lession_ids)->get();

            $new_class_lession_ids = $newClass->classLessons()->pluck('class_lesson.id');

            $index = 0;
            foreach ($attendances as $attendance) {
                $attendance->class_lesson_id = $new_class_lession_ids[$index];
                $attendance->save();
                $index += 1;
            }
        }
        $register->class_id = $classId;
        $register->save();
        // Change group
        if ($newClass->group) {
            if ($oldClass->group) {
                $groupMember = GroupMember::where('user_id', $register->user_id)->where('group_id', $oldClass->group->id)->first();
                if ($groupMember) {
                    $groupMember->group_id = $newClass->group->id;
                    $groupMember->save();
                }
            } else {
                $groupMember = new GroupMember();
                $groupMember->group_id = $newClass->group->id;
                $groupMember->user_id = $register->user_id;
                $groupMember->join_date = format_time_to_mysql(time());
                $groupMember->acceptor_id = $this->user->id;
                $groupMember->position = "member";
                $groupMember->state = "joined";
                $groupMember->save();
            }
        }

        $data['newClass'] = $newClass;
        $data['oldClass'] = $oldClass;
        $user = $register->user;
        $data['user'] = $user;
        $data['register'] = $register;

        $subject = "Xác nhận đã đổi thành công từ lớp $oldClass->name sang lớp $newClass->name";
        $emailcc = ['colorme.idea@gmail.com'];
        Mail::queue('emails.confirm_change_class', $data, function ($m) use ($user, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Color Me');

            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
        });
        $request->session()->flash('change_class_message', 'Bạn đã đổi thành công sang lớp ' . $newClass->name);
        return redirect('manage/registerlist');
    }

    public function change_class($registerId)
    {
        $register = Register::find($registerId);
        $current_gen = $register->gen;
        $classes = $current_gen->studyclasses()->where('course_id', '=', $register->studyClass->course_id)->where('id', '!=', $register->class_id)->get();
        $this->data['register'] = $register;
        $this->data['classes'] = $classes;
        $this->data['old_registers'] = $register->user->registers()->orderBy('created_at', 'desc')->get();
//        return response()->json($this->data);
        return view('manage.student.change_class', $this->data);
    }
}
