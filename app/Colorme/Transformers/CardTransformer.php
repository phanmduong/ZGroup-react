<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


use Modules\Task\Transformers\MemberTransformer;

class CardTransformer extends Transformer
{

    protected $memberTransformer;

    public function __construct(MemberTransformer $memberTransformer)
    {
        $this->memberTransformer = $memberTransformer;
    }


    public function transform($card)
    {
        $this->memberTransformer->setCard($card);
        return [
            'id' => $card->id,
            'title' => $card->title,
            'description' => $card->description,
            'board_id' => $card->board_id,
            'members' => $this->memberTransformer
                ->transformCollection($card->assignees),
            'order' => $card->order,
            'creator' => [
                "id" => $card->creator->id,
                "name" => $card->creator->name
            ],
            'editor' => [
                "id" => $card->editor->id,
                "name" => $card->editor->name
            ],
            'board' => [
                'id' => $card->board_id,
                "title" => $card->board->title
            ],

            'created_at' => time_elapsed_string(strtotime($card->created_at)),
            'updated_at' => format_time_main($card->updated_at)
        ];
    }
}