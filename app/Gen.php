<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Gen extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function scopeGetCurrentGen()
    {
        //status = 1: gen dang duoc tuyen sinh
        $gens = Gen::where('status', 1)->get();
        if ($gens->count() > 0) {
            $gen = $gens[0];
        } else {
            $gen = new Gen;
            $gen->id = -1;
            $gen->name = "Không có";
        }
        return $gen;
    }

    public function scopeGetCurrentTeachGen()
    {
        //status = 1: gen dang duoc tuyen sinh
        $gens = Gen::where('teach_status', 1)->get();
        if ($gens->count() > 0) {
            $gen = $gens[0];
        } else {
            $gen = new Gen;
            $gen->id = -1;
            $gen->name = "Không có";
        }
        return $gen;
    }

    public function studyclasses()
    {
        return $this->hasMany('App\StudyClass', 'gen_id');
    }

    public function telecalls()
    {
        return $this->hasMany('App\TeleCall');
    }

    public function registers()
    {
        return $this->hasMany('App\Register', 'gen_id');
    }

    public function survey_users()
    {
        return $this->hasMany('App\SurveyUser', 'gen_id');
    }

    public function shifts()
    {
        return $this->hasMany('App\Shift', 'gen_id');
    }

    public function work_shifts()
    {
        return $this->hasMany(WorkShift::class, 'gen_id');
    }
}
