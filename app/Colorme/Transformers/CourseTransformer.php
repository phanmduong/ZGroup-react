<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>47
 */

namespace App\Colorme\Transformers;


use App\Gen;

class CourseTransformer extends Transformer
{
    protected $classTransformer;
    protected $user;

    public function __construct(ClassTransformer $classTransformer)
    {
        $this->classTransformer = $classTransformer;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function transform($course)
    {
        if ($this->user) {
            $this->classTransformer->setUser($this->user);
        }
        $current_gen = Gen::getCurrentGen();
        return [
            'name' => $course->name,
            'detail' => $course->detail,
            'description' => $course->description,
            'icon_url' => $course->icon_url,
            'image_url' => $course->image_url,
            'cover_url' => $course->cover_url,
            'classes' => $this->classTransformer
                ->transformCollection($course->classes()->where('status', 1)->orderBy('gen_id', 'desc')
                    ->orderBy('name', 'desc')->get())
        ];
    }
}