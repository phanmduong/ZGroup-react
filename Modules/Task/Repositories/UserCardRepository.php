<?php
/**
 * Created by PhpStorm.
 * User: quanca
 * Date: 27/08/2017
 * Time: 19:56
 */

namespace Modules\Task\Repositories;


use App\Card;
use App\Colorme\Transformers\TaskTransformer;

class UserCardRepository
{
    protected $taskTransformer;

    public function __construct(TaskTransformer $taskTransformer)
    {
        $this->taskTransformer = $taskTransformer;
    }

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

    public function loadCardDetail($cardId)
    {
        $card = Card::find($cardId);
        $files = $card->files->map(function ($file) {
            return [
                "id" => $file->id,
                "name" => $file->name,
                "url" => generate_protocol_url($file->url),
                "ext" => $file->ext,
                "size" => $file->size,
                "file_key" => $file->file_key,
                "created_at" => format_time_main(strtotime($file->created_at))
            ];
        });
        $taskLists = $card->taskLists->map(function ($taskList) {
            return [
                'id' => $taskList->id,
                'title' => $taskList->title,
                'tasks' => $this->taskTransformer->transformCollection($taskList->tasks)
            ];
        });
        $members = $card->assignees->map(function ($member) use ($card) {
            $data = [
                "id" => $member->id,
                "name" => $member->name,
                "avatar_url" => generate_protocol_url($member->avatar_url),
                "email" => $member->email,
                "added" => false
            ];

            $memberIds = $card->assignees()->pluck("id")->toArray();
            if (in_array($member->id, $memberIds)) {
                $data['added'] = true;
            }

            return $data;
        });

        $cardLabels = $card->cardLabels;

        return [
            "description" => $card->description,
            "members" => $members,
            "taskLists" => $taskLists,
            "cardLabels" => $cardLabels,
            "files" => $files
        ];
    }
}