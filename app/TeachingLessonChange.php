<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/21/17
 * Time: 13:31
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class TeachingLessonChange extends Model
{
    protected $table = 'teaching_lesson_change';

    public function class_lesson()
    {
        return $this->belongsTo(ClassLesson::class, 'class_lesson_id');
    }

    public function old_user()
    {
        return $this->belongsTo(User::class, 'old_user_id');
    }

    public function new_user()
    {
        return $this->belongsTo(User::class, 'new_user_id');
    }

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }
}