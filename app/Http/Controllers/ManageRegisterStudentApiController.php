<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 8/28/17
 * Time: 00:08
 */

namespace App\Http\Controllers;

use App\GroupMember;
use App\Register;
use App\Services\EmailService;
use App\StudyClass;
use App\TeleCall;
use App\User;
use App\Gen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ManageRegisterStudentApiController extends ManageApiController
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function history_call_student(Request $request)
    {
        $id = $request->id;

        if ($request->register_id) {
            $register = Register::find($request->register_id);
            $register->call_status = 2;
            $register->save();
        }

        $student = User::find($id);


        $telecall = new TeleCall;
        $telecall->caller_id = $this->user->id;
        $telecall->student_id = $student->id;
        $telecall->note = null;
        $telecall->call_status = 2;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->save();

        $history_call = $student->is_called->map(function ($item) {
            return [
                'id' => $item->id,
                'updated_at' => format_date_full_option($item->updated_at),
                'caller' => [
                    'name' => $item->caller ? $item->caller->name : 'Không có',
                    'color' => $item->caller ? $item->caller->color : ''
                ],
                'call_status' => call_status_text($item->call_status),
                'note' => $item->note,
                'appointment_payment' => $item->appointment_payment ? date_shift(strtotime($item->appointment_payment)) : '',
            ];
        });

        return $this->respondSuccessWithStatus([
            'history_call' => $history_call,
            'telecall_id' => $telecall->id
        ]);
    }

    public function change_call_status(Request $request)
    {
        $student_id = $request->student_id;

        $status = $request->status;
        $student = User::find($student_id);

        if ($request->gen_id) {
            $gen = Gen::find($request->gen_id);
        } else {
            $gen = Gen::getCurrentGen();
        }

//        $registers = $gen->registers()->where('user_id', $student_id)->get();
//        foreach ($registers as $register) {
//
//            $register->call_status = $status;
//            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
//            $register->save();
//        }
        foreach ($student->registers as $register) {
            $register->call_status = $status;
            $register->time_to_reach = ceil(diffDate($register->created_at, date('Y-m-d H:i:s')));
            $register->save();
        }

        $telecall = TeleCall::find($request->telecall_id);
        if ($request->caller_id) {
            $telecall->caller_id = $request->caller_id;
        } else {
            $telecall->caller_id = $this->user->id;
        }

        $telecall->note = $request->note;
        $telecall->gen_id = Gen::getCurrentGen()->id;
        $telecall->call_status = $status;
        $telecall->appointment_payment = $request->appointment_payment ? $request->appointment_payment : null;
        $telecall->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Thành công',
            'call_status' => call_status_text($status)
        ]);
    }

    public function delete_register(Request $request)
    {
        $register = Register::find($request->register_id);

        if ($register->status != 1) {
            $class = $register->studyClass;
            if ($class->registers()->count() < $class->target) {
                $class->status = 1;
                $class->save();
            }

            $this->emailService->send_mail_delete_register($register, $this->user);
            $register->delete();
            return $this->respondSuccessWithStatus([
                'message' => 'Xóa thành công'
            ]);

        }

        return $this->respondSuccessWithStatus([
            'message' => 'Không thể xóa đăng kí này.'
        ]);
    }

    public function get_classes($registerId)
    {
        $register = Register::find($registerId);
        $current_gen = $register->gen;
        $classes = $current_gen->studyclasses()->where('course_id', '=', $register->studyClass->course_id)->where('id', '!=', $register->class_id)->get();
        $classes = $classes->map(function ($class) {
            $class['total_paid'] = $class->registers()->where('status', 1)->count();
            $class['total_register'] = $class->registers()->count();
            return $class;
        });
        return $this->respondSuccessWithStatus([
            'classes' => $classes
        ]);
    }

    public function confirm_change_class(Request $request)
    {
        $registerId = $request->register_id;
        $classId = $request->class_id;

        $newClass = StudyClass::find($classId);

        $register = Register::find($registerId);
        if ($register->code && $newClass->type == "active") {
            $prefix = substr($register->code, 0, strlen(config('app.prefix_code_wait')));

            if ($prefix == config('app.prefix_code_wait')) {
                $register->code = next_code()['next_code'];
                $register->save();
            }
        }

        $oldClass = $register->studyClass;


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

        $this->emailService->send_mail_confirm_change_class($register, $oldClass->name);

//        $subject = "Xác nhận đã đổi thành công từ lớp $oldClass->name sang lớp $newClass->name";
//        $emailcc = ['colorme.idea@gmail.com'];
//        Mail::queue('emails.confirm_change_class', $data, function ($m) use ($user, $subject, $emailcc) {
//            $m->from('no-reply@colorme.vn', 'Color Me');
//
//            $m->to($user['email'], $user['name'])->bcc($emailcc)->subject($subject);
//        });

        $classData = [
            'id' => $newClass->id,
            'name' => $newClass->name,
            "study_time" => $newClass->study_time,
            "description" => $newClass->description,
        ];

        if ($newClass->room) {
            $classData['room'] = $newClass->room->name;
        }

        if ($newClass->base) {
            $classData['base'] = $newClass->base->address;
        }


        return $this->respondSuccessWithStatus([
            'message' => 'Bạn đã đổi học viên thành công sang lớp ' . $classData['name'],
            'class' => $classData,
            'code' => $register->code
        ]);
    }

    public function get_registers_by_user($userId)
    {
//        $regis
    }

}