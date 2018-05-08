<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Register extends Model
{
    use SoftDeletes;

    protected $table = 'registers';

    public function scopeGetRegisterByClasses($scope, $classes, $offset, $limit)
    {
        $class_id_list = $classes->pluck('id')->all();
        return Register::whereIn('class_id', $class_id_list)
            ->orderBy('created_at', 'desc')->skip($offset)->take($limit)->get();
    }

    public function scopeCountRegisterByClasses($scope, $classes)
    {
        $class_id_list = $classes->pluck('id')->all();
        return Register::whereIn('class_id', $class_id_list)->count();
    }

    public function scopeGetAllUncallStudentByGen($scope, $gen_id, $limit, $offset)
    {
        $classes = StudyClass::where('gen_id', $gen_id)->get();
        $class_id_list = $classes->pluck('id')->all();
        $registers = Register::whereIn('class_id', $class_id_list)->where('call_status', 0)->orderBy('updated_at', 'asc')->groupBy('user_id')->take($limit)->skip($offset)->get();
        return $registers;
    }

    public function scopeGetFirstUncallStudent($scope)
    {
        $current_gen = Gen::getCurrentGen();
        $classes = StudyClass::where('gen_id', $current_gen->id)->get();
        $class_id_list = $classes->pluck('id')->all();
        $register = Register::whereIn('class_id', $class_id_list)
            ->where('status', 0)->where('call_status', 0)->orderBy('updated_at', 'asc')->first();
        if ($register == null) {
            return null;
        }
        $student = $register->user;
        $registers = $student->registers;
        foreach ($registers as $regis) {
            $regis->call_status = 2;
            $regis->save();
        }

        return $student;

    }

    public function scopeGetTotalUncalled($scope)
    {
        $current_gen = Gen::getCurrentGen();
        $classes = StudyClass::where('gen_id', $current_gen->id)->get();
        $class_id_list = $classes->pluck('id')->all();
        $count = Register::whereIn('class_id', $class_id_list)->select('user_id')->where('status', 0)->where('call_status', 0)->groupBy('user_id')->get()->count();

        return $count;
    }

    public function scopeGetTotalCalled($scope)
    {
        $current_gen = Gen::getCurrentGen();
        $classes = StudyClass::where('gen_id', $current_gen->id)->get();
        $class_id_list = $classes->pluck('id')->all();
        $count = Register::whereIn('class_id', $class_id_list)->select('user_id')->where('call_status', 1)->groupBy('user_id')->get()->count();
        return $count;
    }


    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function studyClass()
    {
        return $this->belongsTo('App\StudyClass', 'class_id');
    }

    public function staff()
    {
        return $this->belongsTo('App\User', 'staff_id');
    }

    public function saler()
    {
        return $this->belongsTo('App\User', 'saler_id');
    }

    public function gen()
    {
        return $this->belongsTo('App\Gen', 'gen_id');
    }

    public function attendances()
    {
        return $this->hasMany('App\Attendance', 'register_id');
    }

    public function marketing_campaign()
    {
        return $this->belongsTo('App\MarketingCampaign', 'campaign_id');
    }

}
