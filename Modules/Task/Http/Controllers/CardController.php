<?php

namespace Modules\Task\Http\Controllers;

use App\CalendarEvent;
use App\Card;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Modules\Task\Repositories\UserCardRepository;

class CardController extends ManageApiController
{
    protected $userCardRepository;

    public function __construct(UserCardRepository $userCardRepository)
    {
        parent::__construct();
        $this->userCardRepository = $userCardRepository;
    }

    public function assignMember($cardId, $userId)
    {
        $this->userCardRepository->assign($cardId, $userId);
        return $this->respond(["status" => 1]);
    }

    public function updateCardDeadline($cardId, Request $request)
    {
        $card = Card::find($cardId);
        if (is_null($card)) {
            return $this->responseBadRequest("Thẻ không tồn tại");
        }
        if (is_null($request->deadline) || $request->deadline == "") {
            return $this->responseBadRequest("Thiếu hạn chót");
        }

        $card->deadline = format_time_to_mysql(strtotime($request->deadline));
        $card->save();

        $assignees = $card->assignees;


        foreach ($assignees as $assignee) {
            $color = "#777";
            $cardLabel = $card->cardLabels()->first();
            if (!is_null($cardLabel)) {
                $color = $cardLabel->color;
            }
            $event = CalendarEvent::where("user_id", $assignee->id)->where("card_id", $card->id)->first();
            if ($event) {
                $event->delete();
            }

            $calendarEvent = new CalendarEvent();
            $calendarEvent->user_id = $assignee->id;
            $calendarEvent->card_id = $card->id;
            $calendarEvent->all_day = false;
            $calendarEvent->start = $card->deadline;
            $calendarEvent->end = $card->deadline;
            $calendarEvent->title = $card->title;
            $calendarEvent->type = "card";
            $calendarEvent->url = "project/" . $card->board->project_id . "/boards";
            $calendarEvent->color = $color;
            $calendarEvent->editor_id = $this->user->id;
            $calendarEvent->creator_id = $this->user->id;
            $calendarEvent->save();
        }

        return $this->respondSuccessWithStatus([
            "deadline_elapse" => time_remain_string(strtotime($card->deadline)),
            "deadline" => format_vn_short_datetime(strtotime($card->deadline)),
            "message" => "Sửa hạn chót thành công"
        ]);
    }

    public function card($cardId)
    {
        $data = $this->userCardRepository->loadCardDetail($cardId);
        return $this->respond($data);
    }


}
