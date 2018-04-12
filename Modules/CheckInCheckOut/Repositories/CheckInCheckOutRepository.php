<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 9/14/17
 * Time: 10:18 AM
 */

namespace Modules\CheckInCheckOut\Repositories;

use App\Base;
use App\ClassLesson;
use App\Shift;
use App\ShiftSession;
use App\TeachingLesson;
use App\WorkShiftSession;
use App\WorkShiftUser;
use DateTime;
use Modules\CheckInCheckOut\Entities\AppSession;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Entities\Device;
use Modules\CheckInCheckOut\Entities\Wifi;

class CheckInCheckOutRepository
{
    public function __construct()
    {
//        $this->taskTransformer = $taskTransformer;
    }

    /**
     * @param $device_id
     * @param $user_id
     * @return AppSession
     */
    public function addAppSession($device_id, $user_id)
    {
        $appSession = new AppSession();
        $appSession->device_id = $device_id;
        $appSession->user_id = $user_id;
        $appSession->save();
        return $appSession;
    }

    /**
     * Check xem DeviceID của máy đang dùng xem đã có trên hệ thống chưa,
     * nếu chưa có thì tự động
     * thêm vào máy này là của người đang truy cập này (truy cập lần đầu).
     * Nếu như DeviceID này đã tồn tại trong bảng Device,
     * check xem UserID này có khớp với UserID của Device không,
     * nếu không thì trả về user_id của người đang sở hữu máy này.
     * @param $name
     * @param $os
     * @param $device_id
     * @param $user_id
     * @return int
     */
    public function checkDevice($name, $os, $device_id, $user_id)
    {
        $device = Device::where("device_id", $device_id)->first();
        if (is_null($device)) {
            $device = new Device();
            $device->name = $name;
            $device->os = $os;
            $device->device_id = $device_id;
            $device->user_id = $user_id;
            $device->save();
            $this->addAppSession($device->id, $user_id);
            return 0;
        } else {
            $this->addAppSession($device->id, $user_id);
            if ($device->user_id === $user_id) {
                return 0;
            } else {
                return $device->user_id;
            }
        }
    }

    /**
     * @param $mac
     * @return mixed
     */
    public function getWifi($mac, $base_id)
    {
        $wifi = Wifi::where("mac", $mac)->where("base_id", $base_id)->first();
        return $wifi;
    }

    public function setWifi($wifiName, $mac, $base_id)
    {
        $wifi = $this->getWifi($mac, $base_id);
        if (is_null($wifi)) {
            $wifi = new Wifi();
            $wifi->name = $wifiName;
            $wifi->mac = $mac;
            $wifi->base_id = $base_id;
            $wifi->save();
        }
    }

    private function timeIntervalInMinutes($t1, $t2)
    {
        $t1 = strtotime($t1);
        $t2 = strtotime($t2);
        $diff = abs($t2 - $t1);
        $minutes = $diff / 60;
        return $minutes;
    }

    private function checkInCheckOutTeaching(&$checkInCheckOut, $timespan)
    {
        $today = date('Y-m-d');
        $classLessonIds = ClassLesson::where('time', $today)->pluck('id');

        // teacher new version
        $teachingLessons = TeachingLesson::join('class_position', 'class_position.id', '=', 'class_position_id')
            ->whereIn('class_lesson_id', $classLessonIds)
            ->where('position_id', '=', 1)
            ->where('teaching_id', $checkInCheckOut->user_id)
            ->select('teaching_lessons.*')->get();

        foreach ($teachingLessons as $teachingLesson) {
            $classLesson = $teachingLesson->classLesson;
            $start_time = $classLesson->start_time;
            $end_time = $classLesson->end_time;
            $class = $classLesson->studyClass;
            $lesson = $classLesson->lesson;

            if ($class && $lesson) {
                if ($checkInCheckOut->kind == 1) {
                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date('H:i:s'));
//                dd($minutesInterval);
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;

                        $checkInCheckOut->teacher_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = 0;

                        if ($teachingLesson->teacher_checkin_id == 0 || $teachingLesson->teacher_checkin_id == null) {
                            $teachingLesson->teacher_checkin_id = $checkInCheckOut->id;
                            $teachingLesson->save();
                            $checkInCheckOut->message = 'Bạn vừa check in thành công vào lớp ' . $class->name . ' với vai trò là giảng viên buổi ' . $lesson->order;
                        } else {
                            $checkInCheckOut->message = 'Bạn đã check in vào lớp ' . $class->name . ' với vai trò là giảng viên buổi ' . $lesson->order . ' trước đó rồi';
                        }
                    }
                } elseif ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date('H:i:s'));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = 0;
                        $teachingLesson->teacher_checkout_id = $checkInCheckOut->id;
                        $teachingLesson->save();
                        $checkInCheckOut->message = 'Bạn vừa check out thành công vào lớp ' . $class->name . ' với vai trò là giảng viên buổi ' . $lesson->order;
                    }
                }
            }
        }

        // ta new version
        $teachingLessons = TeachingLesson::join('class_position', 'class_position.id', '=', 'class_position_id')
            ->whereIn('class_lesson_id', $classLessonIds)
            ->where('position_id', '=', 2)
            ->where('teaching_id', $checkInCheckOut->user_id)
            ->select('teaching_lessons.*')->get();

        foreach ($teachingLessons as $teachingLesson) {
            $classLesson = $teachingLesson->classLesson;
            $start_time = $classLesson->start_time;
            $end_time = $classLesson->end_time;
            $class = $classLesson->studyClass;
            $lesson = $classLesson->lesson;

            if ($class && $lesson) {
                $className = $class->name;

                if ($checkInCheckOut->kind == 1) {
                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date('H:i:s'));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->shift_id = 0;
                        if ($teachingLesson->ta_checkin_id == 0 || $teachingLesson->ta_checkin_id == null) {
                            $teachingLesson->ta_checkin_id = $checkInCheckOut->id;
                            $teachingLesson->save();
                            $checkInCheckOut->message = 'Bạn vừa check in thành công vào lớp ' . $className . ' với vai trò là trợ giảng buổi ' . $lesson->order;
                        } else {
                            $checkInCheckOut->message = 'Bạn đã check in vào lớp ' . $className . ' với vai trò là trợ giảng buổi ' . $lesson->order . ' trước đó rồi';
                        }
                    }
                } elseif ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date('H:i:s'));
                    if ($minutesInterval < $timespan) {
                        $checkInCheckOut->message = 'Bạn vừa check out thành công vào lớp ' . $className . ' với vai trò là trợ giảng buổi ' . $lesson->order;
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->shift_id = 0;
                        $teachingLesson->ta_checkout_id = $checkInCheckOut->id;
                        $teachingLesson->save();
                    }
                }
            }
        }
    }

    /**
     * @param $checkInCheckOut
     * @return mixed
     */
    public function matchCheckinCheckout($checkInCheckOut)
    {
        $checkInCheckOut->teacher_teaching_lesson_id = 0;
        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
        $checkInCheckOut->shift_id = 0;
        $timespan = 60;
        $today = date("Y-m-d");
        $classLessonIds = ClassLesson::where("time", $today)->pluck("id");
        $checkInCheckOut->message = "Hiện đang không có lớp hoặc ca trực nào khả dụng.";
        $checkInCheckOut->status = 5;
        $checkInCheckOut->save();

        // new teacher
        $this->checkInCheckOutTeaching($checkInCheckOut, $timespan);

        // teacher
        $teachingLessons = TeachingLesson::whereIn("class_lesson_id", $classLessonIds)
            ->where("teacher_id", $checkInCheckOut->user_id)->get();

        foreach ($teachingLessons as $teachingLesson) {
            $classLesson = $teachingLesson->classLesson;
            $start_time = $classLesson->start_time;
            $end_time = $classLesson->end_time;
            $class = $classLesson->studyClass;
            $lesson = $classLesson->lesson;

            if ($class && $lesson) {

                if ($checkInCheckOut->kind == 1) {
                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date("H:i:s"));
//                dd($minutesInterval);
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = 0;

                        if ($teachingLesson->teacher_checkin_id == 0 || $teachingLesson->teacher_checkin_id == null) {
                            $teachingLesson->teacher_checkin_id = $checkInCheckOut->id;
                            $teachingLesson->save();
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn vừa check in thành công vào lớp " . $class->name . " với vai trò là giảng viên buổi " . $lesson->order;
                        } else {
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn đã check in vào lớp " . $class->name . " với vai trò là giảng viên buổi " . $lesson->order . " trước đó rồi";
                        }
                    }

                } else if ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date("H:i:s"));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = 0;
                        $teachingLesson->teacher_checkout_id = $checkInCheckOut->id;
                        $teachingLesson->save();
                        $checkInCheckOut->status = 1;
                        $checkInCheckOut->message = "Bạn vừa check out thành công vào lớp " . $class->name . " với vai trò là giảng viên buổi " . $lesson->order;
                    }

                }
            }
        }

        // teaching assistant
        $teachingLessons = TeachingLesson::whereIn("class_lesson_id", $classLessonIds)
            ->where("teaching_assistant_id", $checkInCheckOut->user_id)->get();

        foreach ($teachingLessons as $teachingLesson) {
            $classLesson = $teachingLesson->classLesson;
            $start_time = $today . " " . $classLesson->start_time;
            $end_time = $today . " " . $classLesson->end_time;

            $class = $classLesson->studyClass;
            $lesson = $classLesson->lesson;

            if ($class && $lesson) {
                $className = $class->name;

                if ($checkInCheckOut->kind == 1) {
                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date("H:i:s"));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->shift_id = 0;
                        if ($teachingLesson->ta_checkin_id == 0 || $teachingLesson->ta_checkin_id == null) {
                            $teachingLesson->ta_checkin_id = $checkInCheckOut->id;
                            $teachingLesson->save();
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn vừa check in thành công vào lớp " . $className . " với vai trò là trợ giảng buổi " . $lesson->order;
                        } else {
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn đã check in vào lớp " . $className . " với vai trò là trợ giảng buổi " . $lesson->order . " trước đó rồi";
                        }
                    }
                } else if ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date("H:i:s"));
                    if ($minutesInterval < $timespan) {
                        $checkInCheckOut->status = 1;
                        $checkInCheckOut->message = "Bạn vừa check out thành công vào lớp " . $className . " với vai trò là trợ giảng buổi " . $lesson->order;
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = $teachingLesson->id;
                        $checkInCheckOut->shift_id = 0;
                        $teachingLesson->ta_checkout_id = $checkInCheckOut->id;
                        $teachingLesson->save();
                    }
                }
            }
        }

        // shifts
        $shifts = Shift::where("date", $today)
            ->where("user_id", $checkInCheckOut->user_id)->get();
        foreach ($shifts as $shift) {
            $shiftSession = $shift->shift_session;

            if ($shiftSession) {
                $start_time = $today . " " . $shiftSession->start_time;
                $end_time = $today . " " . $shiftSession->end_time;


                if ($checkInCheckOut->kind == 1) {
                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date("H:i:s"));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = $shift->id;
                        if ($shift->checkin_id == 0 || $shift->checkin_id == null) {
                            $shift->checkin_id = $checkInCheckOut->id;
                            $shift->save();
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn vừa check in thành công " . $shiftSession->name . " (" . $shiftSession->start_time . " - " . $shiftSession->end_time . ")";
                        } else {
                            $checkInCheckOut->status = 1;
                            $checkInCheckOut->message = "Bạn đã check in ca trực " . $shiftSession->name . " (" . $shiftSession->start_time . " - " . $shiftSession->end_time . ") trước đó rồi";
                        }
                    }

                } else if ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date("H:i:s"));
                    if ($minutesInterval < $timespan) {
                        $timespan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = $shift->id;
                        $checkInCheckOut->status = 6;
                        $checkInCheckOut->message = "Bạn vừa check out thành công " . $shiftSession->name . " (" . $shiftSession->start_time . " - " . $shiftSession->end_time . ")";
                        $shift->checkout_id = $checkInCheckOut->id;
                        $shift->save();
                        if ($shift->checkin_id == null || $shift->checkin_id == 0) {
                            $shiftArr = [$shift];
                            $isCheckin = true;
                            $sampleShift = $shift;
                            while ($sampleShift != null) {
                                $start_time = $sampleShift->shift_session->start_time;
                                $shiftSession = ShiftSession::where("end_time", $start_time)->first();
                                if (is_null($shiftSession)) break;
                                $todayShift = $shiftSession->shifts()->where("user_id", $checkInCheckOut->user_id)->where("date", date("Y-m-d "))->first();
                                if ($todayShift == null) {
                                    $isCheckin = false;
                                }
                                $shiftArr[] = $todayShift;
                                $sampleShift = $todayShift;
                                if ($todayShift != null && ($todayShift->checkin_id != null || $todayShift->checkin_id != 0)) {
                                    $sampleShift = null;
                                }
                            }
                            if ($isCheckin) {
                                foreach ($shiftArr as $s) {
                                    if ($s->checkin_id == null || $s->checkin_id == 0) {
                                        $checkIn = $checkInCheckOut->replicate();
                                        $checkIn->kind = 1;
                                        $checkIn->status = 6;
                                        $checkIn->shift_id = $s->id;
                                        $checkIn->message = "Bạn vừa check in thành công " . $s->shift_session->name . " (" . $s->shift_session->start_time . " - " . $s->shift_session->end_time . ")";
                                        $checkIn->created_at = format_time_to_mysql(strtotime($s->shift_session->start_time));
                                        $checkIn->save();

                                        $s->checkin_id = $checkIn->id;
                                        $s->save();
                                    }
                                    if ($s->checkout_id == null || $s->checkout_id == 0) {
                                        $checkOut = $checkInCheckOut->replicate();
                                        $checkOut->kind = 2;
                                        $checkOut->status = 6;
                                        $checkOut->shift_id = $s->id;
                                        $checkOut->created_at = format_time_to_mysql(strtotime($s->shift_session->end_time));
                                        $checkOut->message = "Bạn vừa check out thành công " . $s->shift_session->name . " (" . $s->shift_session->start_time . " - " . $s->shift_session->end_time . ")";
                                        $checkOut->save();

                                        $s->checkout_id = $checkOut->id;
                                        $s->save();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        // work shifts
        $workShiftUsers = WorkShiftUser::join("work_shifts", "work_shift_user.work_shift_id", "=", "work_shifts.id")
            ->where("date", $today)
            ->where("work_shift_user.user_id", $checkInCheckOut->user_id)->select("work_shift_user.*")->get();

        $workTimeSpan = 28;
        foreach ($workShiftUsers as $workShiftUser) {
            $workShiftUserSession = WorkShiftSession::join("work_shifts", "work_shifts.work_shift_session_id", "=",
                "work_shift_sessions.id")
                ->where("work_shifts.id", $workShiftUser->work_shift_id)->first();
            if ($workShiftUserSession) {
                // lay ra start_time va end_time cua ca trực đó
                $start_time = $today . " " . $workShiftUserSession->start_time;
                $end_time = $today . " " . $workShiftUserSession->end_time;

                // kind=1 check in
                if ($checkInCheckOut->kind == 1) {

                    $minutesInterval = $this->timeIntervalInMinutes($start_time, date("H:i:s"));
                    if ($minutesInterval < $workTimeSpan) {
                        $workTimeSpan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->shift_id = 0;
                        $checkInCheckOut->work_shift_user_id = $workShiftUser->id;
                        if ($workShiftUser->checkin_id == 0 || $workShiftUser->checkin_id == null) {
                            $workShiftUser->checkin_id = $checkInCheckOut->id;
                            $workShiftUser->save();
                            $checkInCheckOut->status = 6;
                            $checkInCheckOut->message = "Bạn vừa check in thành công " . $workShiftUserSession->name . " (" . $workShiftUserSession->start_time . " - " . $workShiftUserSession->end_time . ")";
                        } else {
                            $checkInCheckOut->status = 6;
                            $checkInCheckOut->message = "Bạn đã check in ca làm việc " . $workShiftUserSession->name . " (" . $workShiftUserSession->start_time . " - " . $workShiftUserSession->end_time . ") trước đó rồi";
                        }
                    }

                } else if ($checkInCheckOut->kind == 2) {
                    $minutesInterval = $this->timeIntervalInMinutes($end_time, date("H:i:s"));
                    if ($minutesInterval < $workTimeSpan) {
                        $workTimeSpan = $minutesInterval;
                        $checkInCheckOut->teacher_teaching_lesson_id = 0;
                        $checkInCheckOut->teaching_assistant_teaching_lesson_id = 0;
                        $checkInCheckOut->work_shift_user_id = $workShiftUser->id;
                        $checkInCheckOut->shift_id = 0;
                        $checkInCheckOut->status = 6;
                        $checkInCheckOut->message = "Bạn vừa check out thành công " . $workShiftUserSession->name . " (" . $workShiftUserSession->start_time . " - " . $workShiftUserSession->end_time . ")";

                        $workShiftUser->checkout_id = $checkInCheckOut->id;
                        $workShiftUser->save();
                        if ($workShiftUser->checkin_id == null || $workShiftUser->checkin_id == 0) {
                            $workShiftUserArr = [$workShiftUser];
                            $isCheckin = true;
                            $sampleShift = $workShiftUser;

                            while ($sampleShift != null) {
                                $workShiftUserSessionStart = WorkShiftSession::join("work_shifts", "work_shifts.work_shift_session_id", "=", "work_shift_sessions.id")
                                    ->where("work_shifts.id", $sampleShift->work_shift_id)
                                    ->select("work_shift_sessions.*")->first();

                                if (is_null($workShiftUserSessionStart)) break;
                                $start_time = $workShiftUserSessionStart->start_time;

                                $workShiftUserSession = WorkShiftSession::where("end_time", $start_time)->first();
                                if (is_null($workShiftUserSession)) break;

                                $todayShift = WorkShiftUser::join("work_shifts", "work_shift_user.work_shift_id", "=", "work_shifts.id")
                                    ->where("work_shifts.work_shift_session_id", $workShiftUserSession->id)
                                    ->where("work_shift_user.user_id", $checkInCheckOut->user_id)
                                    ->where("work_shifts.date", date("Y-m-d "))->select("work_shift_user.*")->first();

                                if ($todayShift == null) {
                                    $isCheckin = false;
                                }
                                $workShiftUserArr[] = $todayShift;
                                $sampleShift = $todayShift;

                                if ($todayShift != null && ($todayShift->checkin_id != null || $todayShift->checkin_id != 0)) {
                                    $sampleShift = null;
                                }
                            }
                            if ($isCheckin) {
                                foreach ($workShiftUserArr as $s) {
                                    if ($s->checkin_id == null || $s->checkin_id == 0) {
                                        $workShiftSession = WorkShiftSession::join("work_shifts", "work_shifts.work_shift_session_id", "=", "work_shift_sessions.id")
                                            ->where("work_shifts.id", $s->work_shift_id)->first();
                                        $checkIn = $checkInCheckOut->replicate();
                                        $checkIn->kind = 1;
                                        $checkIn->status = 6;
                                        $checkIn->work_shift_user_id = $s->id;
                                        $checkIn->message = "Bạn vừa check in thành công " . $workShiftSession->name . " (" . $workShiftSession->start_time . " - " . $workShiftSession->end_time . ")";
                                        $checkIn->created_at = format_time_to_mysql(strtotime($workShiftSession->start_time));
                                        $checkIn->save();

                                        $s->checkin_id = $checkIn->id;
                                        $s->save();
                                    }
                                    if ($s->checkout_id == null || $s->checkout_id == 0) {
                                        $workShiftSession = WorkShiftSession::join("work_shifts", "work_shifts.work_shift_session_id", "=", "work_shift_sessions.id")
                                            ->where("work_shifts.id", $s->work_shift_id)->first();
                                        $checkOut = $checkInCheckOut->replicate();
                                        $checkOut->kind = 2;
                                        $checkOut->status = 6;
                                        $checkOut->work_shift_user_id = $s->id;
                                        $checkOut->created_at = format_time_to_mysql(strtotime($workShiftSession->end_time));
                                        $checkOut->message = "Bạn vừa check out thành công " . $workShiftSession->name . " (" . $workShiftSession->start_time . " - " . $workShiftSession->end_time . ")";
                                        $checkOut->save();

                                        $s->checkout_id = $checkOut->id;
                                        $s->save();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        if ($checkInCheckOut->teacher_teaching_lesson_id == 0
            && $checkInCheckOut->teaching_assistant_teaching_lesson_id == 0
            && $checkInCheckOut->shift_id == 0
            && $checkInCheckOut->work_shift_user_id == 0) {

            $date = new DateTime;
            $date->modify('-30 minutes');
            $formatted_date = $date->format('Y-m-d H:i:s');
            $count = CheckInCheckOut::where("user_id", $checkInCheckOut->user_id)
                ->where("created_at", ">=", $formatted_date)->count();

            if ($count >= 500) {
                $checkInCheckOut->message = "Chức năng check in/ check out hiện tại đang bị tạm khoá vì phát hiện nghi vấn. Vui lòng chờ 30 phút để có thể check in/ check out trở lại.";
                $checkInCheckOut->status = 4;
                return $checkInCheckOut;
            }
        }
        $checkInCheckOut->save();
        return $checkInCheckOut;

    }

    /**
     * @param $kind (check in: 1 | checkout: 2)
     * @param $status
     *      1 if everything is correct
     *      2 if wifi is invalid
     *      3 if the location is too far from base
     *      4 other errors
     *      5 other errors
     *      6 autogenerate
     * @param $long
     * @param $lat
     * @param $user_id
     * @param $device_id
     * @param $mac
     * @return CheckInCheckOut
     */
    public function addCheckInCheckOut($kind, $long, $lat, $user_id, $device_id, $mac, $wifiName)
    {
        $checkInCheckOut = new CheckInCheckOut();
        $checkInCheckOut->kind = $kind;
        $checkInCheckOut->longtitude = $long;
        $checkInCheckOut->latitude = $lat;
        $bases = Base::all();
        $minDistance = -1;
        $minBase = null;

        foreach ($bases as $base) {
            $distance = haversineGreatCircleDistance($lat, $long, $base->latitude, $base->longtitude);
            if ($minDistance === -1) {
                $minDistance = $distance;
                $minBase = $base;
            } else {
                if ($distance < $minDistance) {
                    $minDistance = $distance;
                    $minBase = $base;
                }
            }
        }


        if ($minDistance > $minBase->distance_allow) {
            $checkInCheckOut->status = 3;
            $checkInCheckOut->distance = $minDistance;
            return $checkInCheckOut;
        } else {
//            $this->setWifi($wifiName, $mac, $minBase->id);
            $checkInCheckOut->status = 1;
            $wifi = $this->getWifi($mac, $minBase->id);
            if (is_null($wifi)) {
                $checkInCheckOut->status = 2;
                return $checkInCheckOut;
            } else {
                $checkInCheckOut->status = 1;
                $checkInCheckOut->wifi_id = $wifi->id;
            }
        }
        $device = Device::where('device_id', $device_id)->first();
        $checkInCheckOut->distance = $minDistance;
        $checkInCheckOut->base_id = $minBase->id;
        $checkInCheckOut->user_id = $user_id;
        $checkInCheckOut->device_id = $device ? $device->id : 0;
        $checkInCheckOut = $this->matchCheckinCheckout($checkInCheckOut);


        return $checkInCheckOut;
    }

    public function getCheckInCheckOut($checkInCheckOut)
    {
        return [
            'id' => $checkInCheckOut->id,
            'message' => $checkInCheckOut->message,
            'created_at' => format_vn_short_datetime(strtotime($checkInCheckOut->created_at)),
            'time' => format_time_shift(strtotime($checkInCheckOut->created_at))
        ];
    }

}