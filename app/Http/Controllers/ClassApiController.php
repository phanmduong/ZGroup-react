<?php

namespace App\Http\Controllers;

use App\ClassLesson;
use App\Colorme\Transformers\ClassTransformer;
use App\Colorme\Transformers\RegisterToStudentTransformer;
use App\Gen;
use App\Register;
use App\Services\EmailService;
use App\StudyClass;
use App\StudySession;
use DateTime;
use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class ClassApiController extends ApiController
{

    protected $registerToStudentTransformer;
    protected $classTransformer;
    protected $emailService;

    public function __construct(RegisterToStudentTransformer $registerToStudentTransformer,
                                ClassTransformer $classTransformer,
                                EmailService $emailService
    )
    {
        parent::__construct();
        $this->registerToStudentTransformer = $registerToStudentTransformer;
        $this->classTransformer = $classTransformer;
        $this->emailService = $emailService;
    }

    public function enroll($classId)
    {
        $register = $this->user->registers()->where('class_id', $classId)->first();
        if ($register) {
            return $this->respond(['message' => "Bạn đă đăng kí lớp học này. "]);
        } else {
            $register = new Register;
            $register->user_id = $this->user->id;
            $register->gen_id = Gen::getCurrentGen()->id;
            $register->class_id = $classId;
            $register->time_to_call = addTimeToDate($register->created_at, "+2 hours");
            $register->status = 0;

            $register->save();
            $this->emailService->send_mail_confirm_registration($this->user, $classId, ["colorme.idea@gmail.com"]);
            return $this->respond(['message' => "Bạn đă đăng kí thành công. Bạn hãy check email để kiểm tra thông tin đăng kí."]);
        }
    }

    public function currentStudyClass()
    {
        $currentStudySessions = StudySession::all()->filter(function ($s) {
            $now = DateTime::createFromFormat('H:i', date('H:i', time()));

            $start_time = DateTime::createFromFormat('H:i', date('H:i', strtotime('-15 minutes', strtotime($s->start_time))));
            $end_time = DateTime::createFromFormat('H:i', date('H:i', strtotime('+15 minutes', strtotime($s->end_time))));

            return $now > $start_time && $now < $end_time;
        });

        $class_ids = ClassLesson::whereRaw('date(now()) = date(time)')->pluck('class_id');
        $classes = collect([]);

        foreach ($currentStudySessions as $studySession) {
            foreach ($studySession->schedules as $schedule) {
                foreach ($schedule->classes()->whereIn('id', $class_ids)->get() as $class) {
                    if ($classes->filter(function ($c) use ($class) {
                        return $c->id == $class->id;
                    })->isEmpty()
                    ) {
                        $class->class_lessons = $class->classLessons()->whereRaw('date(now()) = date(time)')->get();
                        $classes[] = $class;
                    }
                };
            }
        }

        return $this->respondSuccessWithStatus(
            $this->classTransformer->transformCollection($classes));

    }

    public function students($classId)
    {
        if ($classId) {
            $class = StudyClass::find($classId);
            if ($class) {
                return $this->respond([
                    "class" => [
                        'name' => $class->name,
                        'icon_url' => $class->course->icon_url,
                        'study_time' => $class->study_time,
                        'address' => $class->classroom . " - " . $class->base->address,
                        'course' => $class->course->name,
                        'teacher' => [
                            'name' => $class->teach ? $class->teach->name : null,
                            'email' => $class->teach ? $class->teach->email : null,
                            'avatar_url' => $class->teach ? $class->teach->avatar_url : null
                        ],
                        'assistant' => [
                            'name' => $class->assist ? $class->assist->name : null,
                            'email' => $class->assist ? $class->assist->email : null,
                            'avatar_url' => $class->assist ? $class->assist->avatar_url : null
                        ]
                    ],
                    "students" => $this->registerToStudentTransformer->transformCollection($class->registers)
                ]);
            } else {
                return $this->responseNotFound("classId not found!");
            }

        } else {
            return $this->responseBadRequest("no classId provide");
        }
    }

    public function form($classId, Request $request)
    {
        if ($classId) {
            $class = StudyClass::find($classId);
            if ($class) {
                $status = $request->status;
                if ($status != null) {
                    if ($status == 1 || $status == 0) {
                        $class->status = $status;
                        $class->save();
                        return $this->respond($this->classTransformer->transform($class));
                    } else {
                        return $this->responseBadRequest("status must be 0 or 1");
                    }

                } else {
                    return $this->responseBadRequest("no status provide");
                }
            } else {
                return $this->responseNotFound("classId not found!");
            }

        } else {
            return $this->responseBadRequest("no classId provide");
        }
    }

    public function studyClass($classId)
    {
        if ($classId) {
            $class = StudyClass::find($classId);
            if ($class) {
                return $this->respond($this->classTransformer->transform($class));
            } else {
                return $this->responseNotFound("classId not found!");
            }

        } else {
            return $this->responseBadRequest("no classId provide");
        }
    }

}
