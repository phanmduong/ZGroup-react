<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/3/17
 * Time: 20:33
 */

namespace App\Repositories;


use App\Register;

class DashboardRepository
{

    public function registers($gen_id, $classes = null)
    {
        if ($classes) {
            return Register::where('gen_id', $gen_id)->whereIn('class_id', $classes->pluck('id'));
        }
        return Register::where('gen_id', $gen_id);
    }

    public function ratingUser($user)
    {
        $classe_ids = $user->teach->pluck('id');

        $rating_number_teach = Register::whereIn('class_id', $classe_ids)->where('rating_teacher', '>', 0)->count();
        $rating_avg_teach = Register::whereIn('class_id', $classe_ids)->where('rating_teacher', '>', 0)->avg('rating_teacher');
        $rating_number_ta = Register::whereIn('class_id', $classe_ids)->where('rating_ta', '>', 0)->count();
        $rating_avg_ta = Register::whereIn('class_id', $classe_ids)->where('rating_ta', '>', 0)->avg('rating_ta');

        $data = [];
        if ($rating_avg_teach) {
            $data['rating_number_teach'] = $rating_number_teach;
            $data['rating_avg_teach'] = $rating_avg_teach;
        }

        if ($rating_avg_ta) {
            $data['rating_number_ta'] = $rating_number_ta;
            $data['rating_avg_ta'] = $rating_avg_ta;
        }

        return $data;
    }
}