<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


class CardTransformer extends Transformer
{

    public function transform($card)
    {
        return [
            'id' => $card->id,
            'title' => $card->title,
            'description' => $card->description,
            'order' => $card->order,
            'creator' => [
                "id" => $card->creator->id,
                "name" => $card->creator->name
            ],
            'editor' => [
                "id" => $card->editor->id,
                "name" => $card->editor->name
            ],
            'created_at' => format_time_main($card->created_at),
            'updated_at' => format_time_main($card->updated_at)
        ];
    }
}