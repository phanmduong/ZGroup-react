<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseType extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function courses()
    {
        return $this->hasMany(Course::class, 'type_id');
    }

    public function getData() {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'image_url' => $this->image_url,
            'color' => $this->color,
            'icon_url' => $this->icon_url,
            'cover_url' => $this->cover_url,
            'short_description' => $this->short_description,
            'description' => $this->description,
        ];
        return $data;
    }
}
