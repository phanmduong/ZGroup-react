<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>47
 */

namespace App\Colorme\Transformers;


class ClassTransformer extends Transformer
{
    protected $user;
    protected $lesson;


    public function setUser($user)
    {
        $this->user = $user;
    }

    private function isEnrolled($classId)
    {
        if ($this->user) {
            return $this->user->registers()->where('class_id', $classId)->first() != null;
        } else {
            return false;
        }

    }



    public function transform($class)
    {
        $data = [
            "id" => $class->id,
            "avatar_url" => $class->course->icon_url,
            "name" => $class->name,
            "study_time" => $class->study_time,
            "activated" => $class->activated,
            "status" => $class->status,
            "address" => "",
            "paid_target" => $class->target,
            "register_target" => $class->regis_target,
            "total_registers" => $class->registers->count(),
            "total_paid" => $class->registers->where('status', 1)->count(),
            "datestart" => format_date($class->datestart),
            "description" => $class->description,
            "course" => $class->course->name,
            "isEnrolled" => $this->isEnrolled($class->id)
        ];
        if ($class->room) {
            $data["address"] = $data["address"] . $class->room->name;
        }
        if ($class->base) {
            $data["address"] = $data["address"] . " - " . $class->base->address;
            $data["base"] = [
                "id" => $class->base->id,
                "name" => $class->base->name,
                "address" => $class->base->address
            ];
        }

        if ($class->class_lessons) {
            $data['lesson'] = $class->class_lessons->map(function($c){
                return [
                    'name' => $c->lesson->name,
                    'order' => $c->lesson->order,
                    'description' => $c->lesson->description
                ];
            });
        }


        return $data;
    }
}