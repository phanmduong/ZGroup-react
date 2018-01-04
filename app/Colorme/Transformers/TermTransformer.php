<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class TermTransformer extends Transformer
{

    public function __construct()
    {
    }

    public function transform($term)
    {
        return [
            "id" => $term->id,
            "name" => $term->name,
            "image_url" => $term->image_url,
            "description" => $term->description,
            "order" => $term->order,
            "short_description" => $term->short_description,
            "video_url" => $term->video_url,
            "audio_url" =>$term->audio_url,

        ];
    }
}