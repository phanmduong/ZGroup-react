<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\CheckInCheckOut\Entities\CheckInCheckOut;
use Modules\CheckInCheckOut\Entities\Wifi;

class Base extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    protected $table = 'bases';

    public function rooms()
    {
        return $this->hasMany('App\Room', 'base_id');
    }

    public function classes()
    {
        return $this->hasMany('App\StudyClass', 'base_id');
    }

    public function wifis()
    {
        return $this->hasMany(Wifi::class, 'base_id');
    }

    public function checkInCheckOuts()
    {
        return $this->hasMany(CheckInCheckOut::class, 'base_id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id');
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'avatar_url' => $this->avatar_url ? $this->avatar_url : '',
            'description' => $this->description,
            'images_url' => $this->images_url ? $this->images_url : '',
            'address' => $this->address ? $this->address : '',
            'longitude' => $this->longtitude ? $this->longtitude : '',
            'latitude' => $this->latitude ? $this->latitude : '',
            'district' => $this->district ? $this->district->name : '',
            'province' => $this->district ? $this->district->province->name : '',
        ];
    }

    public function users()
    {
        return $this->hasMany(User::class, 'base_id');
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'display_status' => $this->display_status,
            'longitude' => $this->longtitude,
            'latitude' => $this->latitude,
            'created_at' => format_time_main($this->created_at),
            'updated_at' => format_time_main($this->updated_at),
            'center' => $this->center,
            'images_url' => $this->images_url,
            'description' => $this->description,
            'avatar_url' => config('app.protocol') . trim_url($this->avatar_url),
            'num_rooms' => $this->rooms()->count(),
            'num_classes_registering' => $this->classes()
                ->join('gens', 'gens.id', '=', 'classes.gen_id')
                ->where('gens.status', 1)
                ->count(),
            'num_employees' => $this->users()->where('role', '>', 0)->count()
        ];

        if ($this->district) {
            $data['district'] = $this->district->transform();
            $data['province'] = $this->district->province->transform();
        }
        return $data;
    }
}
