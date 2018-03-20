<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/21/17
 * Time: 13:48
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class ClassLessonChange extends Model
{
    protected $table = "class_lesson_change";

    public function class_lesson(){
        return $this->belongsTo(ClassLesson::class, 'class_lesson_id');
    }

    public function actor(){
        return $this->belongsTo(User::class, 'actor_id');
    }
}