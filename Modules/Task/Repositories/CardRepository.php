<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\CalendarEvent;
use App\Card;
use App\CardComment;
use App\Colorme\Transformers\TaskTransformer;
use App\Notification;
use App\User;
use Illuminate\Support\Facades\Redis;

class CardRepository
{
    protected $taskTransformer;

    public function __construct(TaskTransformer $taskTransformer)
    {
        $this->taskTransformer = $taskTransformer;
    }

    public function saveCardComment($content, $commenter_id, $card_id)
    {
        $cardComment = new  CardComment();
        $cardComment->content = $content;
        $cardComment->commenter_id = $commenter_id;
        $cardComment->card_id = $card_id;
        $cardComment->save();
        return $cardComment;
    }
}