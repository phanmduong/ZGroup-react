<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Card;

class UserCardRepository
{
    public function assign($cardId, $userId)
    {
        $card = Card::find($cardId);
        $assignee = $card->assignees()->where('id', '=', $userId)->first();
        if ($assignee) {
            $card->assignees()->detach($userId);
        } else {
            $card->assignees()->attach($userId);
        }

        return true;
    }
}