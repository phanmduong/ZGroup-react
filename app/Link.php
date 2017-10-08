<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    //
    protected $table = 'links';
//    protected $primaryKey = 'id';

    public $timestamps = false;

    public function course()
    {
        return $this->belongsTo('App\Course', 'course_id');
    }

    public function detailedTransform()
    {
        return [
            "id" => $this->id,
            "link_name" => $this->link_name,
            "link_url" => $this->link_url,
            "link_icon" => $this->link_icon,
            "link_icon_url" => generate_protocol_url($this->link_icon_url),
            "course" => [
                "id" => $this->course->id,
                "name" => $this->course->name,
                "icon_url" => generate_protocol_url($this->course->icon_url)
            ]
        ];
    }
}
