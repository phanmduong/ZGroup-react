<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 19=>02
 */

namespace App\Colorme\Transformers;


class GenTransformer extends Transformer
{


    public function transform($gen)
    {
        return [
            "id" => $gen->id,
            "description" => "Khóa 9 - Bắt đầu tuyển sinh từ cuối tháng 2, chính thức học vào đầu tháng 3",
            "name" => "9",
            "start_time" => "2016-02-14 00=>00=>00",
            "end_time" => "2016-03-05 00=>00=>00",
            "created_at" => "2016-06-05 09=>09=>01",
            "updated_at" => "2016-06-05 14=>08=>47",
        ];
    }
}