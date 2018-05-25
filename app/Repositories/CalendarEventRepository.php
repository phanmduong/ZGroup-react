<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 9/9/17
 * Time: 13:13
 */

namespace App\Repositories;


use App\CalendarEvent;
use App\Card;
use App\Task;

class CalendarEventRepository
{

    public function __construct()
    {
    }

    public function removeCalendarEvent($cardId, $userId)
    {
        $card = Card::find($cardId);
//        $assignees = $card->assignees;
        $event = CalendarEvent::where("user_id", $userId)->where("card_id", $card->id)->first();
        if ($event) {
            $event->delete();
        }
    }

    public function updateCalendarEvent($type, $targetId)
    {
        $calendarEvent = new CalendarEvent();
        $color = "#777";
        switch ($type) {
            case "card":
                $card = Card::find($targetId);
                $cardLabel = $card->cardLabels()->first();
                if (!is_null($cardLabel)) {
                    $color = $cardLabel->color;
                }

                $url = "project/" . $card->board->project_id . "/boards?card_id=" . $targetId;
                $startTime = $card->deadline;
                $endTime = $card->deadline;
                $assignees = $card->assignees;
                $title = $card->title;
                $calendarEvent->card_id = $targetId;
                break;
            case "task":
                $task = Task::find($targetId);
                $card = $task->taskList->card;
                $cardLabel = $card->cardLabels()->first();
                if (!is_null($cardLabel)) {
                    $color = $cardLabel->color;
                }
                $url = "project/" . $card->board->project_id . "/boards?card_id=" . $card->id;
                $startTime = $task->deadline;
                $endTime = $task->deadline;
                $assignees = [$task->member];
                $title = $task->title;
                $calendarEvent->task_id = $targetId;
                break;
            default:
                return null;
        }

        foreach ($assignees as $assignee) {
            if ($assignee) {
                switch ($type) {
                    case "card":
                        $event = CalendarEvent::where("user_id", $assignee->id)->where("card_id", $targetId)->first();
                        break;
                    case "task":
                        $event = CalendarEvent::where("user_id", $assignee->id)->where("task_id", $targetId)->first();
                        break;
                    default:
                        $event = null;
                }
                if ($event) {
                    $event->delete();
                }
//            $this->removeCalendarEvent($cardId, $assignee->id);
                $calendarEvent->user_id = $assignee->id;
                $calendarEvent->all_day = false;
                $calendarEvent->start = $startTime;
                $calendarEvent->end = $endTime;
                $calendarEvent->title = $title;
                $calendarEvent->type = $type;
                $calendarEvent->url = $url;
                $calendarEvent->color = $color;
                $calendarEvent->save();
            }
        }
    }
}